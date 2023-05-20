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

var showPrediction = function(buy, currentPrice, predictedPrice, ticker) {
    ctx.font = '20px Arial';
    if (buy == 'yes') {
        ctx.fillStyle = 'black';
        // ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillText("The Wallstreet Bros' Girlbosses say BUY NOW!", c.width/2, c.height/4)
        ctx.fillText("The Girlboss Gods predict:", c.width/2, c.height/2)
        ctx.fillText(ticker + "   " + predictedPrice, c.width/2, c.height*3.0/4.0)
        ctx.fillStyle = 'green';
        var increase = Number(predictedPrice)-Number(currentPrice)
        var percentIncrease = increase/Number(currentPrice) * 100
        ctx.fillText("+"+ increase + "    +" + percentIncrease + "%", c.width/2, c.height*7.0/8.0)
    } else if (buy == 'no'){
        ctx.fillStyle = 'black';
        // ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillText("The Wallstreet Bros' Girlbosses say SELL NOW!", c.width/2, c.height/4)
        ctx.fillText("The Girlboss Gods predict:", c.width/2, c.height/2)
        ctx.fillText(ticker + "   "+ predictedPrice, c.width/2, c.height*3.0/4.0)
        ctx.fillStyle = 'red';
        var decrease = Number(predictedPrice)-Number(currentPrice)
        var percentDecrease = increase/Number(currentPrice) * 100
        ctx.fillText("-"+ decrease + "    -" + percentDecrease + "%", c.width/2, c.height*7.0/8.0)
    }
}

var loading = document.getElementById('loading');
var prediction = document.getElementById('prediction');
var TICKER = document.getElementById('selectedTicker');
var CURRENT_PRICE = document.getElementById('currentPrice');
var PREDICT_PRICE = document.getElementById('predictPrice');
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

button.addEventListener("click", (event) => {
    event.preventDefault();
    loadingPrediction();
    var tickerform = document.getElementById('tickerform');
    document.tickerform.submit();
})

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        loadedPrediction();
    }
})

var predict = function() {
    showPrediction(prediction.value, CURRENT_PRICE.value , PREDICT_PRICE.value, TICKER.value);
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

var resizeCanvas = function() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

window.addEventListener('resize', () => {
    resizeCanvas()
    showPrediction(prediction.value, CURRENT_PRICE.value, PREDICT_PRICE.value, TICKER.value)
});