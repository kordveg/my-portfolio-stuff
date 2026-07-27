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

// ========================================================================== // 
// UNIVERSAL PORTFOLIO FULL-SCREEN LIGHTBOX ENGINE (SCROLLABLE ARCHIVE VERSION) // 
// ========================================================================== // 
document.addEventListener('DOMContentLoaded', () => { 
  const lightbox = document.createElement('div'); 
  lightbox.className = 'lightbox-modal'; 
  
  const lightboxImg = document.createElement('img'); 
  lightboxImg.className = 'lightbox-content'; 
  lightboxImg.setAttribute('aria-label', 'Full screen archive view'); 
  
  const lightboxCaption = document.createElement('div'); 
  lightboxCaption.style.cssText = "color: var(--text-primary); font-family: 'JetBrains Mono', monospace; margin-top: 25px; margin-bottom: 20px; font-size: 1rem; display: inline-block; max-width: 80%; padding: 0 10px;"; 
  
  lightbox.appendChild(lightboxImg); 
  lightbox.appendChild(lightboxCaption); 
  document.body.appendChild(lightbox); 

  // 2. Watch your gallery placeholders globally for clicks 
  document.body.addEventListener('click', (e) => { 
    // Find if the click happened inside any of your portfolio card layout wrappers
    const targetCard = e.target.closest('.image-placeholder, .sketchbook-wall-item, .illust-card');
    
    if (targetCard) {
      // Find the actual image inside that container card element
      const clickedImg = targetCard.querySelector('img');
      
      if (clickedImg) {
        e.preventDefault(); 
        lightboxImg.src = clickedImg.src; 
        lightboxCaption.textContent = clickedImg.alt || ""; 
        lightboxImg.classList.remove('zoomed'); // Ensure it resets on fresh open 
        lightbox.classList.add('active'); 
        lightbox.scrollTop = 0; // Snap container scroll alignment back to top 
      }
    } 
  }); 

  //  3. Toggle Ultra-Zoom State directly when clicking the artwork image 
  lightboxImg.addEventListener('click', (e) => { 
    e.stopPropagation(); // Stops backdrop exit triggers from executing 
    lightboxImg.classList.toggle('zoomed'); 
  }); 

  // 4. Dismiss full screen view ONLY when clicking the dark backdrop space 
  lightbox.addEventListener('click', (e) => { 
    if (e.target === lightboxImg || e.target === lightboxCaption) { 
      return; 
    } 
    lightbox.classList.remove('active'); 
    lightboxImg.classList.remove('zoomed'); 
  }); 
});
