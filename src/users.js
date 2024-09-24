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
                }
            </style>
        `;
        $('body').append(dynamicStyles); // Append CSS to the body

        // Create elements dynamically
        const onlineCountSection = $('<p><span id="onlineCount"></span></p>');
        const dynamicContainer = $('<div id="dynamicContainer"></div>'); // Container for dynamic elements
        $('body').prepend(
            // onlineCountSection,
            dynamicContainer); // Add them to the body

        // Create a WebSocket connection
        const ws = new WebSocket('ws://' + location.hostname + ':3000');

        // Handle incoming messages from the server
        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);
            $('#onlineCount').text(data.online_users); // Update the online user count

            // Create a new dynamic element
            updateDynamicElement(data.online_users);
        };

        // Handle WebSocket errors
        ws.onerror = function (error) {
            console.error("WebSocket xatoligi: ", error);
        };

        // Track the user's origin using Fetch API
        fetch('http://' + location.hostname + ':3000/api/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ origin: location.origin })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Xato: ', error);
            });
    });

    // Function to create or update the dynamic element
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
