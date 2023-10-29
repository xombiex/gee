const typedOut = document.getElementById("typed-out-text"); // Get the element where you want to display the typed text

const TEXT = [
    "keygen owns u",
    "im so cute frfr",
    "esex when?",
    "wrd 2 my flop"
];

async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

async function doType(text) {
    typedOut.innerText = ""; // Clear the displayed text

    for (let i = 0; i < text.length; i++) {
        typedOut.innerText = text.slice(0, i + 1); // Update the displayed text
        await sleep(100);
    }
    await sleep(1000);

    while (typedOut.innerText.length !== 0) {
        typedOut.innerText = typedOut.innerText.slice(0, typedOut.innerText.length - 1); // Update the displayed text
        await sleep(50);
    }
}

async function typeloop() {
    while (true) {
        for (let i = 0; i < TEXT.length; i++) {
            await doType(TEXT[i]);
        }
    }
}

typeloop();

audio.onended = () => {
    audio.currentTime = 0
    audio.play()
}


document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("audio");
    audio.volume = 0.1;

    audio.play();
});


video.disablePictureInPicture = true