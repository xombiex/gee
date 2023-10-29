const terminal = document.querySelector(".terminal");
const swatted = document.querySelector(".swatted");
const rebootSuccessText = document.querySelector(".swatted_reboot_success");
const maxCharacters = 24;
const unloadedCharacter = ".";
const loadedCharacter = "#";
const spinnerFrames = ["/", "-", "\\", "|"];


(glitchElement => {
    const glitch = glitchElement.cloneNode(true);
    const glitchReverse = glitchElement.cloneNode(true);
    glitch.classList.add("glitch--clone", "glitch--bottom");
    glitchReverse.classList.add("glitch--clone", "glitch--top");
    glitch.setAttribute("aria-hidden", "true");
    glitchReverse.setAttribute("aria-hidden", "true");

    glitchElement.insertAdjacentElement("afterend", glitch);
    glitchElement.insertAdjacentElement("afterend", glitchReverse);
})(terminal);


const loadingBars = document.querySelectorAll(".loading-bar");
const processAmounts = document.querySelectorAll(".process-amount");
const spinners = document.querySelectorAll(".spinner");
const rebootingText = document.querySelectorAll(".swatted_rebooting");
const glitches = document.querySelectorAll(".glitch--clone");


const RandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

const Delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

const HideAll = elements =>
    elements.forEach(glitchGroup =>
        glitchGroup.forEach(element => element.classList.add("hidden")));

const ShowAll = elements =>
    elements.forEach(glitchGroup =>
        glitchGroup.forEach(element => element.classList.remove("hidden")));


const RenderBar = (values) => {
    const currentLoaded = values.lastIndexOf(loadedCharacter) + 1;
    const loaded = values.slice(0, currentLoaded).join("");
    const unloaded = values.slice(currentLoaded).join("");


    loadingBars.forEach(loadingBar => {
        loadingBar.innerHTML = `(${loaded}<span class="loading-bar--unloaded">${unloaded}</span>)`;
    });


    loadingPercent = Math.floor(currentLoaded / maxCharacters * 100);
    processAmounts.forEach(processAmount => {
        processAmount.innerText = loadingPercent;
    });
};


const DrawLoadingBar = (values) => {
    return new Promise((resolve) => {
        const loadingBarAnimation = setInterval(() => {
            if (!values.includes(unloadedCharacter)) {
                clearInterval(loadingBarAnimation);
                resolve();
            }

            values.pop(unloadedCharacter);
            values.unshift(loadedCharacter);
            RenderBar(values);
        }, RandomNumber(50, 300));
    });
};

const DrawSpinner = (spinnerFrame = 0) => {
    return setInterval(() => {
        spinnerFrame += 1;
        spinners.forEach(
            spinner =>
                (spinner.innerText = `[${
                    spinnerFrames[spinnerFrame % spinnerFrames.length]
                }]`)
        );
    }, RandomNumber(50, 300));
};

const AnimateBox = () => {
    const first = swatted.getBoundingClientRect();
    HideAll([spinners, glitches, rebootingText]);
    rebootSuccessText.classList.remove("hidden");
    rebootSuccessText.style.visibility = "hidden";
    const last = swatted.getBoundingClientRect();

    const swattedAnimation = swatted.animate([{
            transform: `scale(${first.width / last.width}, ${first.height / last.height})`
        },
        {
            transform: `scale(${first.width / last.width}, 1.2)`
        },
        {
            transform: `none`
        }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0,0,0.32,1)',
    });

    swattedAnimation.addEventListener('finish', () => {
        rebootSuccessText.removeAttribute("style");
        swatted.removeAttribute("style");
    });
};

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('rebootSuccess', function () {
        window.location.href = 'index.html';
    });
});


const Playswatted = async () => {
    terminal.classList.add("glitch");
    rebootSuccessText.classList.add("hidden");
    ShowAll([spinners, glitches, rebootingText]);
    const loadingBar = new Array(maxCharacters).fill(unloadedCharacter);
    const spinnerInterval = DrawSpinner();

    await DrawLoadingBar(loadingBar);

    requestAnimationFrame(() => {
        clearInterval(spinnerInterval);
        terminal.classList.remove("glitch");
        AnimateBox();
        setTimeout(() => {
            const rebootEvent = new Event('rebootSuccess');
            document.dispatchEvent(rebootEvent);
        }, 5000);
    });
};

Playswatted();