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
var loadingPrediction = function() {
    var prediction = document.getElementById('prediction');
    window.cancelAnimationFrame(requestID);
    loading.style.display = 'block';
    button = document.getElementById('predict');
    button.disabled = true;

    if(prediction.value != '') {

        window.cancelAnimationFrame(requestID);
        loading.style.display = 'none';
        button.disabled = false;
        showPrediction(prediction.value);
        
    }
    requestID = window.requestAnimationFrame(loadingPrediction);

}

var predict = function() {
    var prediction = document.getElementById('prediction');
    prediction.value = '';

    loadingPrediction();
    showPrediction(prediction.value);
}
button.addEventListener('click', predict);
/* hide login button once logged in and show user profile dropdown thingy

var loginButton = document.getElementById("loginButton");
loginButton.style.display = "none"

var loggedInButton = document.getElementById("loggedInButton");
loggedInButton.style.display = ""
*/