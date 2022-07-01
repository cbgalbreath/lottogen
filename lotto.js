const results = [];

lottoTexasResults();
displayResults();

// gets 6 numbers
function lottoTexasResults(){
    
    for (let x = 0; x < 6; x++){
        lottoTexas();
    }
}

//adapts random numbers to Lotto Texas (1-54), ensuring no matching numbers.
function lottoTexas(){
    let lTBall = 0;
    do{
        lTBall = Math.floor(lottoBall() * 54) + 1;
    }while(results.includes(lTBall)); //loops through function until it gets a non-matching number.
    results.push(lTBall);
}

// display to web page
function displayResults(){
    const element = document.getElementById('lotto-texas-results');
    for (let x = 0; x < results.length; x++){
        const ball = document.createElement('div');
        ball.innerText = results[x];
        element.appendChild(ball);
    }
}

// refresh results
function refresh(){
    results.length = 0;
    document.getElementById('lotto-texas-results').innerHTML = " ";
    lottoTexasResults();
    displayResults();
}

//gets a random number
function lottoBall(){
   return Math.random();
}