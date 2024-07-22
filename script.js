const englishName = "Kamalesh N";
const kannadaName = "ಕಮಲೇಶ್ ಎನ್";  // Transliteration of "Kamalesh N" in Kannada
const nameElement = document.getElementById("name");

function displayLetterByLetter(text, callback) {
    nameElement.innerHTML = ""; // Clear previous content
    text.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.className = "name-letter fade-in";
        span.style.animationDelay = `${index * 0.1}s`;
        span.textContent = letter === " " ? "\u00A0" : letter; // Ensure space is included
        nameElement.appendChild(span);
    });
    setTimeout(callback, text.length * 100 + 1000); // Adjust delay to wait for animation to complete
}

function fadeOutName(callback) {
    const spans = nameElement.querySelectorAll('span');
    spans.forEach((span, index) => {
        // Apply fade-out effect with delay based on letter index
        setTimeout(() => {
            span.classList.add('fade-out');
        }, index * 50); // Adjust the delay to control the speed of fading
    });

    // Clear the name and call the callback after the fade-out duration
    setTimeout(() => {
        nameElement.innerHTML = "";
        callback();
    }, spans.length * 50 + 1000); // Adjust the total duration to ensure complete fade-out
}

function startAnimation() {
    nameElement.style.fontFamily = "'Noto Sans', sans-serif"; // Set default font for English
    displayLetterByLetter(englishName, () => {
        setTimeout(() => {
            fadeOutName(() => {
                nameElement.style.fontFamily = "'Noto Sans Kannada', sans-serif"; // Change font for Kannada
                displayLetterByLetter(kannadaName, () => {
                    setTimeout(() => {
                        fadeOutName(startAnimation);
                    }, 2000); // Adjust delay as needed
                });
            });
        }, 2000); // Adjust delay as needed
    });
}

startAnimation();

// Projects slider
document.addEventListener('DOMContentLoaded', function() {
    var splide = new Splide('#project-slider', {
        type: 'loop',
        autoplay: true,
        interval: 6000,  // Adjust the interval to your desired loop time (in milliseconds)
        pauseOnHover: false,
        resetProgress: false,
        arrows: false,
        pagination: false,
    }).mount();

    function resetAutoplay() {
        splide.Components.Autoplay.play();
    }

    document.querySelector('.next-button').addEventListener('click', function() {
        splide.go('>');
        resetAutoplay();
    });

    document.querySelector('.prev-button').addEventListener('click', function() {
        splide.go('<');
        resetAutoplay();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var splide = new Splide('#sketch-slides', {
        type       : 'loop',
        perPage    : 3, // Number of slides to show per page
        focus      : 'center',
        autoplay   : true, // Enable auto slide
        interval   : 3000, // Time between slides (in milliseconds)
        pauseOnHover: true, // Pause on hover
        breakpoints: {
            600: {
                perPage: 1, // Show 1 slide on small screens
            },
            900: {
                perPage: 2, // Show 2 slides on medium screens
            },
        },
    });

    // Mount the slider
    splide.mount();
});