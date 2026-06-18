const video = document.getElementById('bg-video');
const audioBtn = document.getElementById('audio-toggle');

// Accurate mute/unmute switcher
audioBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    if (video.muted) {
        video.muted = false;
        audioBtn.textContent = "🔊"; 
    } else {
        video.muted = true;
        audioBtn.textContent = "🔇"; 
    }
});

// --- Play video when visible, pause when out of view ---
const observerOptions = {
    root: null,
    threshold: 0.5 
};

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            video.play().catch(error => {
                console.log("Autoplay blocked:", error);
            });
        } else {
            video.pause();
        }
    });
}, observerOptions);

videoObserver.observe(video);

// --- Scroll Effect for Navbar ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});