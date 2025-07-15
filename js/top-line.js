// Toggle the dropdown menu
function toggleMenu() {
    const dropdown = document.getElementById("menuDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Toggle the settings menu
function toggleSettings() {
    const settingsMenu = document.getElementById("settingsMenu");
    const menuDropdown = document.getElementById("menuDropdown");

    // Close menu if open
    if (menuDropdown.style.display === "block") {
        menuDropdown.style.display = "none";
    }
    
    // Toggle settings
    settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
}

// Toggle Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const darkModeCheckbox = document.getElementById("darkModeToggle");

    if (darkModeCheckbox.checked) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
}

// Change Font Size
function changeFontSize() {
    const fontSize = document.getElementById("fontSizeRange").value;
    document.body.style.fontSize = fontSize + "px";
    localStorage.setItem('fontSize', fontSize);
}

function showAbout() {
    document.getElementById('aboutOverlay').style.display = 'flex';
}

function hideAbout() {
    document.getElementById('aboutOverlay').style.display = 'none';
}

// Close overlay when clicking outside the content
window.onclick = function(event) {
    const overlay = document.getElementById('aboutOverlay');
    if (event.target == overlay) {
        overlay.style.display = 'none';
    }
    
    // Close dropdown and settings menu when clicking outside
    const dropdown = document.getElementById('menuDropdown');
    const settingsMenu = document.getElementById('settingsMenu');
    
    if (!event.target.matches('.menu') && !event.target.matches('.settings-btn')) {
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
        if (settingsMenu.style.display === 'block') {
            settingsMenu.style.display = 'none';
        }
    }
}

// Initialize dark mode preference if set
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved dark mode preference
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // Check for saved font size preference
    const fontSizeRange = document.getElementById('fontSizeRange');
    if (localStorage.getItem('fontSize')) {
        const savedSize = localStorage.getItem('fontSize');
        document.body.style.fontSize = savedSize + 'px';
        fontSizeRange.value = savedSize;
    }
    
    // Save preferences when changed
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Use input event for real-time feedback
    fontSizeRange.addEventListener('input', function() {
        changeFontSize();
    });
    
    // Also save on change for good measure
    fontSizeRange.addEventListener('change', function() {
        localStorage.setItem('fontSize', this.value);
    });

// Debounced font size change
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Then modify the event listener:
fontSizeRange.addEventListener('input', debounce(function() {
  document.body.style.fontSize = this.value + 'px';
  localStorage.setItem('fontSize', this.value);
}, 100));

});