document.addEventListener('DOMContentLoaded', function() {

    // Navbar toggle functionality
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId);
    
        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // Show navbar on mobile
                nav.classList.toggle('show');
                // Change icon
                toggle.classList.toggle('bx-x');
                // Add padding to body
                bodypd.classList.toggle('body-pd');
                // Add padding to header
                headerpd.classList.toggle('body-pd');
            });
        }
    };
    
    // Initialize navbar toggle for mobile
    showNavbar('header-toggle', 'side-nav', 'body-pd', 'headernav');
    
    const linkColor = document.querySelectorAll('.nav_link, .navbar-link');

    function colorLink() {
        linkColor.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    }

    linkColor.forEach(l => l.addEventListener('click', colorLink));

    // Update active link based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let scrollY = window.scrollY + 150; // Adjust this value based on your header height
    
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
    
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav_link.active')?.classList.remove('active');
                document.querySelector('.navbar-link.active')?.classList.remove('active');
                document.querySelector(`.nav_link[href*=${sectionId}]`)?.classList.add('active');
                document.querySelector(`.navbar-link[href*=${sectionId}]`)?.classList.add('active');
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const backToTopButton = document.getElementById('back-to-top');
        const headerHeight = document.getElementById('headernav').offsetHeight;
        const scrollPosition = window.scrollY;
    
        // Show the button when scrolling past the header
        if (scrollPosition > headerHeight) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    
        // Activate "Home" link when at the top
        if (scrollPosition === 0) {
            linkColor.forEach(l => l.classList.remove('active'));
            document.querySelector('.nav_link[href="#"]').classList.add('active');
        }
    });
    
    // Scroll back to the top when the button is clicked
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    document.querySelectorAll('.view-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const src = this.getAttribute('data-cert');
            const modal = document.querySelector('.certificate-modal');
            const modalImage = modal.querySelector('img');
            modalImage.src = src;
            modal.classList.add('show');
        });
    });
    
    document.querySelector('.close-btn').addEventListener('click', function() {
        const modal = document.querySelector('.certificate-modal');
        modal.classList.remove('show');
    });
    
    // Close modal when clicking outside of the image
    document.querySelector('.certificate-modal').addEventListener('click', function(event) {
        if (event.target === this) {
            this.classList.remove('show');
        }
    });
    

    // Letter-by-letter name animation
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

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        var name = document.querySelector('input[name="name"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var message = document.querySelector('textarea[name="message"]').value;
        
        if (!name || !email || !message) {
            event.preventDefault();
            document.getElementById('error').style.display = 'block';
            return false;
        }
        
        // Handle form submission with a service or AJAX request here
        
        // Example success message (remove if using a backend service)
        document.getElementById('success').style.display = 'block';
        event.preventDefault(); // Prevent default form submission for demo
    });
});
