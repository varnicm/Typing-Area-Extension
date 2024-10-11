// Check if typing area already exists to avoid duplication
if (!document.getElementById('typing-area')) {
    // Create a container div for the typing area
    const typingArea = document.createElement('div');
    typingArea.setAttribute('id', 'typing-area');

    // Create a textarea inside the container
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'custom-textarea');
    textarea.setAttribute('placeholder', 'Type something here...');
    typingArea.appendChild(textarea);

    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'close-button');
    closeButton.textContent = 'Close';
    typingArea.appendChild(closeButton);

    // Append the container to the body of the page
    document.body.appendChild(typingArea);

    // Inject the CSS to style the typing area and close button
    const style = document.createElement('style');
    style.textContent = `
      #typing-area {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f9f9f9;
        padding: 10px;
        border-top: 1px solid #ddd;
        z-index: 10000;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: ns-resize; /* Change cursor to indicate resizable top */
      }

      #custom-textarea {
        width: 95%;
        height: 100px;
        font-size: 16px;
        border: 1px solid #ccc;
        padding: 5px;
        box-sizing: border-box;
        resize: none;
      }

      #close-button {
        margin-top: 10px;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
      }

      #close-button:hover {
        background-color: #d32f2f;
      }
    `;
    document.head.appendChild(style);

    // Add event listener to close the typing area when the close button is clicked
    closeButton.addEventListener('click', function() {
        typingArea.remove();
    });

    // Add functionality to resize the typing area by dragging the top border
    let isResizing = false;
    let initialY = 0;
    let initialHeight = 0;

    typingArea.addEventListener('mousedown', function(e) {
        if (e.target === typingArea) {
            isResizing = true;
            initialY = e.clientY;
            initialHeight = typingArea.offsetHeight;
            document.body.style.cursor = 'ns-resize';
            e.preventDefault(); // Prevent text selection during resize
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        const deltaY = initialY - e.clientY;
        typingArea.style.height = `${initialHeight + deltaY}px`;
        textarea.style.height = `${initialHeight + deltaY - 50}px`; // Adjust textarea height accordingly
    });

    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = 'default';
        }
    });
}
