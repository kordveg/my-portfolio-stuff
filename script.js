// Function to sync the theme on initial page load
function initTheme() {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
  }
}

// Run the check immediately when script loads to prevent flashes
initTheme();

// Grab the toggle button if it exists on the current page
const toggleButton = document.getElementById('theme-toggle');

// Only attach the listener if the page actually contains the switch widget
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    // Toggle the .light-mode styling rules on or off
    document.body.classList.toggle('light-mode');
    
    // Check if light mode is currently active after the click
    let theme = 'dark';
    if (document.body.classList.contains('light-mode')) {
      theme = 'light';
    }
    
    // Save the choice to local memory so it stays active across reloads and pages
    localStorage.setItem('theme', theme);
  });
}

// ==========================================================================
// NEW FEATURE: Universal Portfolio Full-Screen Lightbox Engine (With Captions)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Create and inject the modal framework backdrop elements dynamically
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-modal';

  const lightboxImg = document.createElement('img');
  lightboxImg.className = 'lightbox-content';
  lightboxImg.setAttribute('aria-label', 'Full screen archive view');
  
  // Create a text container for the artwork descriptions
  const lightboxCaption = document.createElement('div');
  lightboxCaption.style.cssText = "color: var(--text-primary); font-family: 'JetBrains Mono', monospace; margin-top: 15px; font-size: 1rem; text-align: center; max-width: 80%; padding: 0 10px;";
  
  // Append both the image and the caption text track into the container
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(lightboxCaption);
  document.body.appendChild(lightbox);

  // 2. Watch your gallery placeholder frames globally for asset image clicks
  document.body.addEventListener('click', (e) => {
    // 🎯 FIX: Tracks real click actions on regular blocks OR raw uncropped wall scans!
    const clickedImg = e.target.closest('.image-placeholder img, .sketchbook-wall-item img');
    
    if (clickedImg) {
      e.preventDefault();
      lightboxImg.src = clickedImg.src;
      
      // Pulls description straight from the alt text of your HTML image tag
      lightboxCaption.textContent = clickedImg.alt || ""; 
      lightbox.classList.add('active');
    }
  });

  // 3. Dismiss full screen view instantly when clicking anywhere on the screen backdrop
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
});
