// Check if jQuery is already loaded
if (typeof jQuery === 'undefined') {
    // Create a script element to load jQuery
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.onload = initialize; // Call initialize after jQuery is loaded
    document.head.appendChild(script);
} else {
    initialize(); // If jQuery is already loaded, call initialize directly
}

function initialize() {
    $(document).ready(function () {
        // Append CSS for the dynamic element
        const dynamicStyles = `
            <style>
                .dynamic-element {
                    position: fixed;
                    bottom: 20px; /* Distance from the bottom */
                    right: 20px;  /* Distance from the right */
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 9999;
                }
            </style>
        `;
        $('head').append(dynamicStyles); // Append CSS to the head

        // Create a container for dynamic content
        const dynamicContainer = $('<div id="dynamicContainer"></div>');
        $('body').append(dynamicContainer); // Append the container to the body

        // WebSocket connection (use 'wss://' for secure connections)
        const ws = new WebSocket('wss://sharqona-online.onrender.com');

        // Handle incoming messages from the server
        ws.onmessage = function (event) {
            try {
                const data = JSON.parse(event.data);
                const onlineUsers = data.online_users || 0; // Fallback in case data is missing

                // Update the dynamic element
                updateDynamicElement(onlineUsers);
            } catch (e) {
                console.error("WebSocket data parsing error:", e);
            }
        };

        // Handle WebSocket errors
        ws.onerror = function (error) {
            console.error("WebSocket error:", error);
        };

        // Track the user's origin using Fetch API
        fetch('https://sharqona-online.onrender.com/api/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ origin: location.origin })
        })
        .then(response => response.json())
        .then(data => console.log('User tracking:', data))
        .catch(error => console.error('Error tracking user:', error));
    });

    // Function to create or update the dynamic element showing online users
    function updateDynamicElement(userCount) {
        let element = $('.dynamic-element');
        if (element.length === 0) {
            // If the element doesn't exist, create it
            element = $('<div class="dynamic-element"></div>')
                .appendTo('#dynamicContainer');
        }
        // Update the text content
        element.text(`Hozirda sayt: ${userCount} foydalanuvchi`);
    }
}
