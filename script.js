let sequence = [];
let userSequence = [];
let level = 1;
let levelUpdate = document.querySelector('.level-value')
function startGame() {
    resetGame();
   setTimeout(()=>{playSequence()},2500) ;
    updateCountdown()
}

function resetGame() {
    sequence = [];
    userSequence = [];
    level = 1;
}

function playSequence() {
    updateMessage(` Level ${level}`);
    levelUpdate.innerText = level
    disableButtons();

    for (let i = 0; i < level; i++) {
        const randomButton = getRandomButton();
        sequence.push(randomButton);
        setTimeout(() => {
            highlightButton(randomButton);
            setTimeout(() => unhighlightButton(randomButton), 500);
        }, i * 1000);
    }

    setTimeout(() => {
        updateMessage("Your turn!");
        enableButtons();
    }, level * 1000);
}

function getRandomButton() {
    const buttons = ['A', 'B', 'C', 'D'];
    const randomIndex = Math.floor(Math.random() * buttons.length);
    return buttons[randomIndex];
}


const audioElement = document.getElementById('audio');
let countdownValue = 3;
function updateCountdown() {
    document.querySelector('#countdown').classList.remove('hidden')
    const timerElement = document.getElementById('timer');
    timerElement.textContent = countdownValue;

    if (countdownValue === 0) {
        document.querySelector('#countdown').classList.add('hidden')
    } else {
        countdownValue--;
        setTimeout(updateCountdown, 700);
        audioElement.play();
    }
}

function highlightButton(button) {
    const buttonElement = document.getElementById(button);
    if (buttonElement) {
        buttonElement.classList.add('highlight');
    }
}

function unhighlightButton(button) {
    const buttonElement = document.getElementById(button);
    if (buttonElement) {
       
        buttonElement.classList.remove('highlight');
    }
}

function enableButtons() {
    const buttons = document.querySelectorAll('.game-button');
    buttons.forEach(button => button.disabled = false);
}

function disableButtons() {
    const buttons = document.querySelectorAll('.game-button');
    buttons.forEach(button => button.disabled = true);
}

function checkUserSequence() {
    if (sequence.length === userSequence.length) {
        if (userSequence.join('') === sequence.join('')) {
            updateMessage(`Correct! Level ${++level}`);
             audio.src = 'audios/mixkit-achievement-bell-600.wav'
        audio.play();
            userSequence = [];
            setTimeout(playSequence, 1000);
        } else {
            audio.src = 'audios/mixkit-losing-bleeps-2026.wav'
            audio.play();
            updateMessage('game over..start again');
            resetGame();
        }
    }
}


function updateMessage(message) {
    document.querySelector('.message').innerText = message;
}

function handleButtonClick(button) {
    userSequence.push(button);
    highlightButton(button);
    setTimeout(() => {
        unhighlightButton(button);
        checkUserSequence();
    }, 500);
}

// Dynamically create buttons
const buttonContainer = document.getElementById('game-container');
const buttonColors = [ '#33ff00','#ff0000', '#ffff00', '#0080ff'];
['A', 'B', 'C', 'D'].forEach((button, index )=> {
    const buttonElement = document.createElement('button');
    buttonElement.className = 'game-button';
    buttonElement.id = button;
    buttonElement.innerText = button;
    buttonElement.style.backgroundColor = buttonColors[index];
    buttonElement.addEventListener('click', () => handleButtonClick(button));
    buttonContainer.appendChild(buttonElement);
});



let userText = document.querySelector('#username')
function enterUsername() {
    document.querySelector('.onload-page').classList.remove('hidden')
}

function nextpage() {
    if (userText.value == '') {
        document.querySelector('.error-text').classList.remove('hidden')
        return false
    }
    document.querySelector('.onload-page').classList.add('hidden')
    localStorage.setItem('value', userText.value)
    document.querySelector('.user-value').innerText = localStorage.getItem('value')
}

window.addEventListener('load', enterUsername)
