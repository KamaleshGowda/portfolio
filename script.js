const englishName = "Kamalesh N";
const kannadaName = "ಕಮಲೇಶ್ ಎನ್";
const nameElement = document.getElementById("name");

function displayLetterByLetter(text, callback) {
    nameElement.innerHTML = ""; // Clear previous content
    
    const segmenter = new Intl.Segmenter('kn', { granularity: 'grapheme' });
    const segments = Array.from(segmenter.segment(text));

    segments.forEach((segment, index) => {
        const span = document.createElement("span");
        span.className = "name-letter fade-in";
        span.style.animationDelay = `${index * 0.1}s`;
        span.textContent = segment.segment === " " ? "\u00A0" : segment.segment;
        nameElement.appendChild(span);
    });
    
    setTimeout(callback, segments.length * 100 + 1000);
}

function fadeOutName(callback) {
    const spans = nameElement.querySelectorAll('span');
    spans.forEach((span, index) => {
        
        setTimeout(() => {
            span.classList.add('fade-out');
        }, index * 50); 
    });

    // Clear the name and call the callback after the fade-out duration
    setTimeout(() => {
        nameElement.innerHTML = "";
        callback();
    }, spans.length * 50 + 1000); 
}

function startAnimation() {
    nameElement.style.fontFamily = "'Noto Sans', sans-serif"; // Set default font for English
    displayLetterByLetter(englishName, () => {
        setTimeout(() => {
            fadeOutName(() => {
                nameElement.style.fontFamily = "'Noto Sans Kannada', sans-serif"; // Change to Kannada font
                displayLetterByLetter(kannadaName, () => {
                    setTimeout(() => {
                        fadeOutName(() => {
                            nameElement.style.fontFamily = "'Noto Sans', sans-serif"; // Revert to English font
                            startAnimation();
                        });
                    }, 2000);
                });
            });
        }, 2000); 
    });
}

startAnimation();

document.addEventListener('DOMContentLoaded', function() {
    var carouselElement = document.getElementById('carouselExampleCaptions');
    var carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        touch: true
    });

    var startX, endX;
    carouselElement.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    });
    carouselElement.addEventListener('touchmove', function(event) {
        endX = event.touches[0].clientX;
    });
    carouselElement.addEventListener('touchend', function(event) {
        var threshold = 50; 
        if (startX - endX > threshold) {
            carousel.next();
        } else if (endX - startX > threshold) {
            carousel.prev();
        }
    });
});

