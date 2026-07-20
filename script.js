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
