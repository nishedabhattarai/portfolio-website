// Function to show the overlay
function showOverlay() {
    const overlay = document.getElementById('sitewide-overlay');
    overlay.classList.add('active');
    
    // Reset and start countdown animation
    const countdown = overlay.querySelector('.countdown-progress');
    countdown.style.animation = 'none';
    setTimeout(() => {
        countdown.style.animation = 'countdown 10s linear forwards';
    }, 10);
    
    // Hide overlay after 5 seconds
    clearTimeout(window.overlayTimeout);
    window.overlayTimeout = setTimeout(() => {
        closeOverlay();
    }, 10000);
}

// Function to close the overlay
function closeOverlay() {
    const overlay = document.getElementById('sitewide-overlay');
    overlay.classList.remove('active');
    clearTimeout(window.overlayTimeout);
}

// Show overlay when page loads
window.addEventListener('DOMContentLoaded', (event) => {
    // Show after a brief delay so the page loads first
    setTimeout(showOverlay, 1000);
});

// Close overlay when pressing Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeOverlay();
    }
});