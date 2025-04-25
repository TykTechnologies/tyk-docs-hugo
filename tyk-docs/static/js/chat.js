// Chat widget functionality
document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const chatInput = document.getElementById('chat-input');
  const chatSubmit = document.getElementById('chat-submit');
  const chatMessages = document.getElementById('chat-messages');
  const chatBubble = document.getElementById('chat-bubble');
  const chatPopup = document.getElementById('chat-popup');
  const closePopup = document.getElementById('close-popup');

  // Configure marked.js options
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
      const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
      return hljs.highlight(code, { language: validLanguage }).value;
    },
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartypants: false,
    xhtml: false
  });

  // Add event listeners
  chatSubmit.addEventListener('click', function () {
    const message = chatInput.value.trim();
    if (!message) return;

    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
    onUserRequest(message);
  });

  chatInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      chatSubmit.click();
    }
  });

  chatBubble.addEventListener('click', function () {
    togglePopup();
  });

  closePopup.addEventListener('click', function () {
    togglePopup();
  });

  // Toggle chat popup visibility
  function togglePopup() {
    chatPopup.classList.toggle('hidden');
    if (!chatPopup.classList.contains('hidden')) {
      chatInput.focus();
    }
  }

  // Handle user message and API call
  function onUserRequest(message) {
    // Display user message
    const messageElement = document.createElement('div');
    messageElement.className = 'flex justify-end mb-3';
    messageElement.innerHTML = `
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]">
          ${message}
        </div>
      `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Handle streaming response
    handleStreamingResponse(message);
  }

  function handleStreamingResponse(message) {
    const replyElement = document.createElement('div');
    replyElement.className = 'flex flex-col mb-3'; // <-- Make it a column container
    replyElement.innerHTML = `
      <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
        <div class="raw-content" style="white-space: pre-wrap;"></div>
      </div>
      <div class="flex justify-start mt-1 typing-indicator">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    let replyAppended = false;

    const messageContainer = replyElement.querySelector('.bg-gray-200');
    const rawContentContainer = replyElement.querySelector('.raw-content');
    const typingIndicator = replyElement.querySelector('.typing-indicator');

    // Set up headers for SSE
    const headers = new Headers({
      'Accept': 'text/event-stream',
      'Content-Type': 'application/json'
    });

    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://tyk-docs-ask-ai.dokku.tyk.technology/api/stream', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ prompt: message }),
      signal: signal
    }).then(response => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedText = '';

      function processStream() {
        reader.read().then(({ done, value }) => {
          if (done) {
            console.log('Stream complete');
            if (typingIndicator) typingIndicator.remove();
            renderMarkdown(accumulatedText, rawContentContainer);
            return;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.trim() === '') continue;

            const dataMatch = line.match(/^data: (.+)$/m);
            if (!dataMatch) continue;
            const data = dataMatch[1];

            if (data === '[DONE]') {
              if (typingIndicator) typingIndicator.remove();
              renderMarkdown(accumulatedText, rawContentContainer);
              return;
            }

            try {
              const parsedData = JSON.parse(data);
              if (parsedData.text) {
                if (!replyAppended) {
                  chatMessages.appendChild(replyElement);
                  chatMessages.scrollTop = chatMessages.scrollHeight;
                  replyAppended = true;
                }
                accumulatedText += parsedData.text;
                rawContentContainer.textContent = accumulatedText;
                chatMessages.scrollTop = chatMessages.scrollHeight;
              }
            } catch (error) {
              console.error('Error parsing SSE data:', error);
            }
          }

          processStream();
        }).catch(error => {
          console.error('Error reading from stream:', error);
          if (typingIndicator) typingIndicator.remove();
          if (!accumulatedText) {
            rawContentContainer.textContent = 'Sorry, something went wrong with the streaming connection.';
          }
        });
      }

      processStream();
    }).catch(error => {
      console.error('Error fetching stream:', error);
      if (typingIndicator) typingIndicator.remove();
      rawContentContainer.textContent = 'Sorry, something went wrong with the streaming connection.';
    });
  }

  // Helper to render Markdown at the end
  function renderMarkdown(accumulatedText, container) {
    try {
      const markdownContainer = document.createElement('div');
      markdownContainer.className = 'markdown-content';
      markdownContainer.innerHTML = marked.parse(accumulatedText);
      container.replaceWith(markdownContainer);

      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    } catch (error) {
      console.error('Error rendering final markdown:', error);
    }
  }
});
