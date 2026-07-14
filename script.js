// Grab the button component from the HTML page
const toggleButton = document.getElementById('theme-toggle');

// Check the browser storage to see if they picked light mode before
const currentTheme = localStorage.getItem('theme');

// If they previously chose light mode, apply it right away
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
}

// Watch for clicks on the theme switch button
toggleButton.addEventListener('click', () => {
    // Toggle the .light-mode styling rules on or off
    document.body.classList.toggle('light-mode');
    
    // Check if light mode is currently active after the click
    let theme = 'dark';
    if (document.body.classList.contains('light-mode')) {
        theme = 'light';
    }
    
    // Save the choice to local memory so it stays active on reload
    localStorage.setItem('theme', theme);
});
