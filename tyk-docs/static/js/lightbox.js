document.addEventListener("DOMContentLoaded", function () {
    // Array of images to exclude from the modal functionality
    // You can add class names, IDs, or src patterns to match
    const excludedImages = [
        '.copy-icon', // Exclude all images with class 'copy-icon'
        // 'img[src="/docs/img/copy.png"]', // Exclude specific image by src
        // '.no-expand', // Images with class 'no-expand'
        // '#logo-image', // Image with ID 'logo-image'
        // 'img[data-no-expand="true"]', // Images with data attribute
        // 'img[src*="icon"]', // Images with 'icon' in their src
        // Add more selectors as needed
    ];

    // Create the modal elements
    let modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    modal.style.display = "none";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.cursor = "pointer";
    modal.style.zIndex = "1000"; // Higher than header's z-index (11)

    let img = document.createElement("img");
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";

    let closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "20px";
    closeButton.style.fontSize = "30px";
    closeButton.style.color = "white";
    closeButton.style.cursor = "pointer";

    modal.appendChild(img);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);

    // Function to check if an image should be excluded
    function shouldExcludeImage(image) {
        // Check if image is inside an anchor tag
        if (image.closest('a')) {
            return true;
        }

        // Check against the exclusion list
        for (const selector of excludedImages) {
            if (image.matches(selector)) {
                return true;
            }
        }
        
        return false;
    }

    // Set cursor style for all images in main-content
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
        // Add pointer cursor to all images in main-content that are not excluded
        const contentImages = mainContent.querySelectorAll("img");
        contentImages.forEach(image => {
            if (!shouldExcludeImage(image)) {
                image.style.cursor = "pointer";
            }
        });

        mainContent.addEventListener("click", function (event) {
            if (event.target.tagName === "IMG" && event.target !== img) {
                // Check if the clicked image should not be excluded
                if (!shouldExcludeImage(event.target)) {
                    img.src = event.target.src;
                    modal.style.display = "flex";
                }
            }
        });
    }

    // Close modal when clicked (but not when clicking the image itself)
    modal.addEventListener("click", function (event) {
        if (event.target !== img) {
            modal.style.display = "none";
        }
    });

    // Close modal when clicking the close button
    closeButton.addEventListener("click", function (event) {
        modal.style.display = "none";
        event.stopPropagation(); // Prevent modal click from triggering
    });

    // Close modal when pressing the Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.style.display === "flex") {
            modal.style.display = "none";
        }
    });
});
