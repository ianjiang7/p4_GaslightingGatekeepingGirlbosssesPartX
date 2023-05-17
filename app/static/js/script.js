var test = function() {
    console.log('test');
}
var requestID;  

button = document.getElementById('predict');

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

var showPrediction = function(buy) {
    if (buy == 'yes') {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, c.width, c.height);
    } else if (buy == 'no'){
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, c.width, c.height);
    }
}

var loading = document.getElementById('loading');
var prediction = document.getElementById('prediction');
var button = document.getElementById('predict');

var loadingPrediction = function() {
    console.log('loading');
    loading.style.display = 'block';
    button.disabled = true;
}

var loadedPrediction = function() {
    loading.style.display = 'none';
    button.disabled = false;
}

var predict = function() {
    //loadedPrediction();
    showPrediction(prediction.value);
    //loadingPrediction;
    // showPrediction(prediction.value);
}
//button.addEventListener('click', loadingPrediction());
prediction.addEventListener('change', predict());
// hide login button once logged in and show user profile dropdown thingy

var loginButton = document.getElementById("loginButton");
var loggedIn = document.getElementById("loggedIn");
var hideLogin = function() {
    loginButton.style.display = "none"
    loggedIn.style.display = ""
}


loginButton.addEventListener('change', hideLogin());