var test = function() {
    console.log('test');
}

var body = document.getElementsByTagName('body')[0];
console.log(body);
var lightModeButton = document.getElementById('light-mode');
var lightMode = function() {
    body.setAttribute('data-bs-theme', 'light');
};

var darkModeButton = document.getElementById('dark-mode');
var darkMode = function() {
    body.setAttribute('data-bs-theme', 'dark');
};

lightModeButton.addEventListener('click', lightMode);
darkModeButton.addEventListener('click', darkMode);