document.addEventListener('DOMContentLoaded', function() {
    // Get all h2 headings
    const headings = document.querySelectorAll('h2');

    // Add horizontal lines before all h2 headings except the first
    headings.forEach((heading, index) => {
        if (index > 0) {
            const hr = document.createElement('hr');
            hr.className = 'section-divider';
            heading.parentNode.insertBefore(hr, heading);
        }
    });

    // Calculate reading times for all sections
    headings.forEach((heading, index) => {
        // Get content between this h2 and the next h2
        let content = '';
        let nextHeading = headings[index + 1];
        let currentNode = heading.nextElementSibling;

        // Skip the reading time indicator itself
        if (currentNode && currentNode.classList.contains('section-reading-time')) {
            currentNode = currentNode.nextElementSibling;
        }

        // Collect all text until the next heading
        while (currentNode && currentNode !== nextHeading && !currentNode.matches('h2')) {
            if (currentNode.textContent) {
                // Skip any nested reading time indicators and horizontal lines
                if (!currentNode.classList.contains('section-reading-time') &&
                    !currentNode.classList.contains('section-divider')) {
                    content += currentNode.textContent + ' ';
                }
            }
            currentNode = currentNode.nextElementSibling;
        }

        // Calculate reading time (words ÷ 200 words per minute)
        const words = content.split(/\s+/).filter(word => word.length > 0).length;
        const readingTime = Math.max(1, Math.round(words / 200));
        const readTimeText = readingTime > 1 ? "minutes" : "minute";

        // Find the reading time element for this heading
        const timeElement = heading.nextElementSibling;
        if (timeElement && timeElement.classList.contains('section-reading-time')) {
            // Replace the "Calculating..." text with the actual reading time
            timeElement.innerHTML = timeElement.innerHTML.replace('Calculating...',
                `${readingTime} ${readTimeText} read`);
        }
    });
});
