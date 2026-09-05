const video = document.getElementById('bg-video');
const audioBtn = document.getElementById('audio-toggle');

// Initialize correctly for modern browser autoplay policies
video.muted = true; 

// 1. Force play with audio on first user interaction
function unlockAudio(e) {
    // Prevent overriding if the user explicitly clicked the mute button first
    if (e.target === audioBtn) return; 

    // Only attempt playback adjustments if the video isn't hidden deep down
    if (window.scrollY <= 400) {
        video.muted = false;
        audioBtn.textContent = "🔊";
        video.play().catch(err => console.log("Playback pending user interaction...", err));
    }
    
    cleanUpListeners();
}

function cleanUpListeners() {
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
}

document.addEventListener('click', unlockAudio);
document.addEventListener('keydown', unlockAudio);

// 2. Manual Mute/Unmute toggle
audioBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    cleanUpListeners(); // Kill global unlock logic immediately once the user takes manual command
    
    if (video.muted) {
        video.muted = false;
        audioBtn.textContent = "🔊"; 
        // Re-trigger play in case scroll logic paused it unexpectedly
        if (window.scrollY <= 400) {
            video.play().catch(err => console.log("Playback failed on manual unmute:", err));
        }
    } else {
        video.muted = true;
        audioBtn.textContent = "🔇"; 
    }
});

// 3. Smart Scroll Handle: Performance optimized with an execution lock
let isDeepScrolled = false;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 400) {
        if (!isDeepScrolled) {
            navbar.classList.add('scrolled');
            video.pause(); // Freezes rendering thread, saving hardware resources
            isDeepScrolled = true;
        }
    } else {
        if (isDeepScrolled) {
            navbar.classList.remove('scrolled');
            // Safely resume playback only if the browser context permits it
            video.play().catch(err => console.log("Playback restoration safely bypassed:", err));
            isDeepScrolled = false;
        }
    }
});
