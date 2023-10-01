/*
GAME FUNCTIONS: 
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player pf the correct number of guesses attempts are exhausted
- Let player choose to play again
*/

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const  UIgame = document.querySelector('#game');
const  UIminNum = document.querySelector('.min-num');
const  UImaxNum = document.querySelector('.max-num');
const  UIguessBtn = document.querySelector('#guess-btn');
const  UIguessInput = document.querySelector('#guess-input');
const  UImessage = document.querySelector('#message');

// Assign UI min and max values
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play Again event listner
UIgame.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess 
UIguessBtn.addEventListener('click', function(){
    let guess = parseInt(UIguessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if guess is correct
    if (guess === winningNum){
       gameOver(true, `Congrats! You guessed the number ${winningNum}!`)
    } else {

        guessesLeft--;

        if (guessesLeft === 0){
            // Game over - lost 
            gameOver(false, `Game over, you lost. The correct number was
            ${winningNum}`);
        } else {
            // Game continues - answer wrong

            // Change border color
            UIguessInput.style.borderColor = 'red';
            // Clear Input
            UIguessInput.value = '';

            // Set message
            setMessage(`incorrect, guesses left: ${guessesLeft}`, 'red');
        }
    }
});

function gameOver(won, msg){

    let color ;
    won === true ? color = 'green' : color = 'red';
    
    // Disable input
    UIguessInput.disabled = true;
    // Change border color
    UIguessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);

    // Play Again?
    UIguessBtn.value = 'Play Again';
    UIguessBtn.className += 'play-again';

}

// Gett Winning Number
function getRandomNum(min, max) {
    return  Math.floor(Math.random() * (max - min + 1) + min)
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
