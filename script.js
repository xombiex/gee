// script.js
window.onload = function () {
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipAddress').textContent = data.ip;
        })
        .catch(error => {
            document.getElementById('ipAddress').textContent = 'Error fetching IP address';
        });
};
