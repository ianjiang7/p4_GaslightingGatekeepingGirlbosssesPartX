var test = function() {
    console.log('test');
}

var body = document.getElementsByTagName('body')[0];
console.log(body);
var lightModeButton = document.getElementById('lightMode');
var lightMode = function() {
    body.setAttribute('data-bs-theme', 'light');
};

var darkModeButton = document.getElementById('darkMode');
var darkMode = function() {
    body.setAttribute('data-bs-theme', 'dark');
};

lightModeButton.addEventListener('click', lightMode);
darkModeButton.addEventListener('click', darkMode);

/* hide login button once logged in and show user profile dropdown thingy */
var loginButton = document.getElementById("login");
loginButton.style.display = "none"

var loggedInButton = document.getElementById("loggedInButton");
loggedInButton.style.display = ""
