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

// var showPrediction = function(buy, currentPrice, predictedPrice, ticker) {
//     ctx.font = '20px Arial';
//     ctx.textAlign = 'center';
//     if (buy == 'yes') {
//         ctx.fillStyle = 'black';
//         // ctx.fillRect(0, 0, c.width, c.height);
//         ctx.fillText("The Wallstreet Bros' Girlbosses say BUY NOW!", c.width/2, c.height/4)
//         ctx.fillText("The Girlboss Gods predict:", c.width/2, c.height/2)
//         ctx.fillText(ticker + "   " + predictedPrice, c.width/2, c.height*3.0/4.0)
//         ctx.fillStyle = 'green';
//         var increase = Number(predictedPrice)-Number(currentPrice)
//         var percentIncrease = increase/Number(currentPrice) * 100
//         ctx.fillText("+"+ increase + "    +" + percentIncrease + "%", c.width/2, c.height*7.0/8.0)
//     } else if (buy == 'no'){
//         ctx.fillStyle = 'black';
//         // ctx.fillRect(0, 0, c.width, c.height);
//         ctx.fillText("The Wallstreet Bros' Girlbosses say SELL NOW!", c.width/2, c.height/4)
//         ctx.fillText("The Girlboss Gods predict:", c.width/2, c.height/2)
//         ctx.fillText(ticker + "   "+ predictedPrice, c.width/2, c.height*3.0/4.0)
//         ctx.fillStyle = 'red';
//         var decrease = Number(predictedPrice)-Number(currentPrice)
//         var percentDecrease = increase/Number(currentPrice) * 100
//         ctx.fillText("-"+ decrease + "    -" + percentDecrease + "%", c.width/2, c.height*7.0/8.0)
//     }
// }
var display = document.getElementById('display');
var h1 = document.getElementById('h1');
var h2 = document.getElementById('h2');
var h3 = document.getElementById('h3');
var priceSpan = document.getElementById('price');
var changeSpan = document.getElementById('change');
var showPrediction = function(buy, currentPrice, predictedPrice, ticker) {
    h1.innerHTML = "The Wallstreet Bros' Girlbosses say "
    h2.innerHTML = "The Girlboss Gods predict:"
    priceSpan.innerText = ticker + "   " + predictedPrice
    var change = Number(predictedPrice)-Number(currentPrice)
    var percentChange = change/Number(currentPrice) * 100
    if (buy == 'yes') {
        h1.innerHTML += "BUY NOW!"
        changeSpan.style.color = 'green';
        changeSpan.innerText = "+"+ change.toFixed(2) + "    +" + percentChange.toFixed(2) + "%"
    } else if (buy == 'no'){
        h1.innerHTML += "SELL NOW!"
        changeSpan.style.color = 'red';
        changeSpan.innerText = "-"+ change.toFixed(2) + "    -" + percentChange.toFixed(2) + "%"
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

dropdown = document.getElementById('ticker');
button.addEventListener("click", (event) => {
    event.preventDefault();
    if (dropdown.value == 'Pick a stock') {
        alert('Please pick a stock!')
        return
    }
    loadingPrediction();
    var tickerform = document.getElementById('tickerform');
    document.tickerform.submit();
})

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        loadedPrediction();
    }
    if (prediction.value == '') {
        display.style.display = 'none';
    }
})

var predict = function() {
    display.style.display = 'block';
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