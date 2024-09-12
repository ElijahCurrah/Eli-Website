window.onload = function() {
    console.log("Page is fully loaded, and now this script runs automatically.");
        fetch('header.html') // Load the header HTML file
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data; // Insert the header HTML into the page
        });
};