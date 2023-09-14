// script.js
window.onload = function () {
    // Function to generate a random color in hex format (#RRGGBB)
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to continuously change text color
    function flashRandomColor() {
        const ipAddressElement = document.getElementById('ipAddress');
        ipAddressElement.style.color = getRandomColor();
    }

    // Fetch IP address initially
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddressElement = document.getElementById('ipAddress');
            ipAddressElement.textContent = data.ip;
            
            // Start with white text
            ipAddressElement.style.color = 'white';
            
            // Set up interval to change text color every 500 milliseconds (0.5 seconds)
            setInterval(flashRandomColor, 500);
        })
        .catch(error => {
            document.getElementById('ipAddress').textContent = 'Error fetching IP address';
        });
};
