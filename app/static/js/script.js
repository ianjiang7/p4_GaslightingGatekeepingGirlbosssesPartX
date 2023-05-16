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

var c = document.getElementById('canvas');
var ctx = c.getContext('2d');

var predict = function(buy) {
    if (buy == 'yes') {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.fillRect(0, 0, c.width, c.height);
}