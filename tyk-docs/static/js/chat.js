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
  
    // Handle streaming response
    function handleStreamingResponse(message) {
      // Create a placeholder for the bot's response with typing indicator
      const replyElement = document.createElement('div');
      replyElement.className = 'flex mb-3';
      replyElement.innerHTML = `
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="raw-content" style="white-space: pre-wrap;"></div>
        </div>
      `;
      chatMessages.appendChild(replyElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  
      // Get the message container and content container
      const messageContainer = replyElement.querySelector('.bg-gray-200');
      const rawContentContainer = replyElement.querySelector('.raw-content');
  
      // Set up headers for SSE
      const headers = new Headers({
        'Accept': 'text/event-stream',
        'Content-Type': 'application/json'
      });
  
      // Create a controller to abort the fetch if needed
      const controller = new AbortController();
      const signal = controller.signal;
  
      // Make a POST request to the streaming endpoint
      fetch('http://localhost:3000/api/stream', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ prompt: message }),
        signal: signal
      }).then(response => {
        // Create a reader for the response body
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
  
        // Initialize accumulated text for the message
        let accumulatedText = '';
  
        // Function to process the stream
        function processStream() {
          // Read from the stream
          reader.read().then(({ done, value }) => {
            if (done) {
              console.log('Stream complete');
  
              // Remove typing indicator when done
              const typingIndicator = messageContainer.querySelector('.typing-indicator');
              if (typingIndicator) {
                typingIndicator.remove();
              }
  
              // Replace the raw content with properly rendered markdown
              try {
                // Create a new div for the markdown content
                const markdownContainer = document.createElement('div');
                markdownContainer.className = 'markdown-content';
                markdownContainer.innerHTML = marked.parse(accumulatedText);
  
                // Replace the raw content with the markdown content
                rawContentContainer.replaceWith(markdownContainer);
  
                // Apply syntax highlighting to code blocks
                messageContainer.querySelectorAll('pre code').forEach((block) => {
                  hljs.highlightElement(block);
                });
              } catch (error) {
                console.error('Error rendering final markdown:', error);
                // Keep the raw content if there's an error
              }
  
              return;
            }
  
            // Decode the chunk and add it to our buffer
            buffer += decoder.decode(value, { stream: true });
  
            // Process any complete SSE messages in the buffer
            const lines = buffer.split('\n\n');
            buffer = lines.pop() || ''; // Keep the last incomplete chunk in the buffer
  
            // Process each complete message
            for (const line of lines) {
              if (line.trim() === '') continue;
  
              // Extract the data part
              const dataMatch = line.match(/^data: (.+)$/m);
              if (!dataMatch) continue;
  
              const data = dataMatch[1];
  
              // Check if the stream is done
              if (data === '[DONE]') {
                // Remove typing indicator
                const typingIndicator = messageContainer.querySelector('.typing-indicator');
                if (typingIndicator) {
                  typingIndicator.remove();
                }
  
                // Replace the raw content with properly rendered markdown
                try {
                  // Create a new div for the markdown content
                  const markdownContainer = document.createElement('div');
                  markdownContainer.className = 'markdown-content';
                  markdownContainer.innerHTML = marked.parse(accumulatedText);
  
                  // Replace the raw content with the markdown content
                  rawContentContainer.replaceWith(markdownContainer);
  
                  // Apply syntax highlighting to code blocks
                  messageContainer.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                  });
                } catch (error) {
                  console.error('Error rendering final markdown:', error);
                  // Keep the raw content if there's an error
                }
  
                return;
              }
  
              try {
                // Parse the JSON data
                const parsedData = JSON.parse(data);
  
                // Append the new text chunk
                if (parsedData.text) {
                  // Remove typing indicator after first chunk
                  const typingIndicator = messageContainer.querySelector('.typing-indicator');
                  if (typingIndicator) {
                    typingIndicator.remove();
                  }
  
                  // Update accumulated text
                  accumulatedText += parsedData.text;
  
                  // Update the raw content display
                  rawContentContainer.textContent = accumulatedText;
  
                  // Scroll to bottom as text streams in
                  chatMessages.scrollTop = chatMessages.scrollHeight;
                }
              } catch (error) {
                console.error('Error parsing SSE data:', error);
              }
            }
  
            // Continue reading from the stream
            processStream();
          }).catch(error => {
            console.error('Error reading from stream:', error);
  
            // Remove typing indicator
            const typingIndicator = messageContainer.querySelector('.typing-indicator');
            if (typingIndicator) {
              typingIndicator.remove();
            }
  
            // Show error message if no text has been received yet
            if (!accumulatedText) {
              rawContentContainer.textContent = 'Sorry, something went wrong with the streaming connection.';
            }
          });
        }
  
        // Start processing the stream
        processStream();
      }).catch(error => {
        console.error('Error fetching stream:', error);
  
        // Remove typing indicator
        const typingIndicator = messageContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
          typingIndicator.remove();
        }
  
        // Show error message
        rawContentContainer.textContent = 'Sorry, something went wrong with the streaming connection.';
      });
    }
  });
  