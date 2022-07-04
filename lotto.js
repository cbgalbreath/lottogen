const game = [{name: "Lotto Texas", balls: 6, numbers: 54, start: 1, duplicates: false, bonusBall: false},
{name: "Pick 3", balls: 3, numbers: 10, start: 0, duplicates: true, bonusBall: false},
{name: "PowerBall", balls: 5, numbers: 69, start: 1, duplicates: false, bonusBall: true, bonusNumbers: 26}];

const allResults = [];
const allBonus = [];

game.forEach (lottoResults); // gets results
displayResults(game, allResults, allBonus); //displays results


// display to web page
function displayResults(gameObj, allResults, allBonus){
    const element = document.getElementById('lotto-results');
    for (let x = 0; x < gameObj.length; x++){
        const game = document.createElement('div')
        game.setAttribute("class", "results-container");
        game.setAttribute("id", "game"); 
        element.appendChild(game); 
        displayTitle(gameObj[x].name);
        displayGame(allResults[x],allBonus[x]);     
    }
}

function displayTitle(name){
    const element = document.getElementById('game');
    const title = document.createElement('div');
    title.setAttribute("class", "title");
    title.innerHTML =`<h2>` + name + `</h2>`;
    element.appendChild(title);
}

function displayGame(results, bonus)
{
    const element = document.getElementById('game');
    const numbers = document.createElement('div')
    numbers.setAttribute("class", "results");

    for (let x = 0; x < results.length; x++){
       const ball = document.createElement('div')
       ball.setAttribute("class", "ball");
       ball.innerText = results[x];
       numbers.appendChild(ball)
    }
    if (bonus != null){
        const bonusBall = document.createElement('div');
        bonusBall.setAttribute("class", "bonus");
        bonusBall.innerText = bonus;
        numbers.appendChild(bonusBall);
    }
    element.appendChild(numbers);
}
 

//refresh results
function refresh(gameObj){
    allResults.length = 0;
    allBonus.length = 0;
    document.getElementById('lotto-results').innerHTML = " ";
    gameObj.forEach(lottoResults);
    displayResults(gameObj, allResults, allBonus);
} 

// gets numbers
function lottoResults(gameObj){
    const results = [];
    let bonus = null;
    if (!gameObj.duplicates){ //checks if duplicates allowed
        for(let x = 0; x < gameObj.balls; x++){
            results.push(duplicateCheck(results, gameObj.numbers, gameObj.start));
        }
    }
    else{
        for(let x = 0; x < gameObj.balls; x++){
            results.push(lottoBall(gameObj.numbers,gameObj.start));
        }
    }
    allResults.push(results);
    if(gameObj.bonusBall){
        bonus = lottoBall(gameObj.numbers, gameObj.start); //assigns a number to bonus ball
    }
    allBonus.push(bonus);
}

//checks for each option is a duplicate number
function duplicateCheck(results, numbers, start) {
    let ball = 0;
    do {
        ball = lottoBall(numbers, start);
    } while(results.includes(ball))
   return ball;

}

//gets a random number
function lottoBall(numbers, start){
   return Math.floor((Math.random() * numbers) + start);
}