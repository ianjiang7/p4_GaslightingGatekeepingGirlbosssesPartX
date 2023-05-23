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


var showPrediction = function(buy) {
    if (buy == 'yes') {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, c.width, c.height);
    } else if (buy == 'no'){
<<<<<<< HEAD
        h1.innerHTML += "SELL NOW!"
        changeSpan.style.color = 'red';
        changeSpan.innerText = + change.toFixed(2) + "    " + percentChange.toFixed(2) + "%"
=======
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, c.width, c.height);
>>>>>>> 8fbf677669c7d4f23976e9ed3b7870a7b2fc4f8b
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
    showPrediction(prediction.value);
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


<<<<<<< HEAD
// window.addEventListener('resize', () => {
//     showPrediction(prediction.value, CURRENT_PRICE.value, PREDICT_PRICE.value, TICKER.value)
// });
=======
window.addEventListener('resize', () => {
    resizeCanvas()}
    );
>>>>>>> 8fbf677669c7d4f23976e9ed3b7870a7b2fc4f8b
