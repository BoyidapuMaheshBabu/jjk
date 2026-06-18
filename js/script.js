const video = document.getElementById('bg-video');
const audioBtn = document.getElementById('audio-toggle');

// 1. Force play with audio on first user interaction
function unlockAudio() {
    video.muted = false;
    // Increased scroll level here as well
    if (window.scrollY <= 700) {
        video.play().catch(err => console.log("Playback pending...", err));
        audioBtn.textContent = "🔊";
    }
    
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
}

document.addEventListener('click', unlockAudio);
document.addEventListener('keydown', unlockAudio);

// 2. Manual Mute/Unmute toggle
audioBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (video.muted) {
        video.muted = false;
        audioBtn.textContent = "🔊"; 
    } else {
        video.muted = true;
        audioBtn.textContent = "🔇"; 
    }
});

// 3. Smart Scroll Handle: Pauses ONLY after scrolling deep into the page
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    // Changing this from 80 to 500 lets you scroll down much further before it pauses
    if (window.scrollY > 700) {
        // We are deep inside the episodes area
        navbar.classList.add('scrolled');
        if (!video.paused) {
            video.pause(); // Pauses and saves frame position
        }
    } else {
        // We are back near the top half of the web page
        navbar.classList.remove('scrolled');
        if (video.paused) {
            video.play().catch(err => console.log("Playback interrupted:", err)); // Resumes cleanly
        }
    }
});