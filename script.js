function startGame() {

    highlightRandomButton()

    updateMessage('game started 👾')
    document.querySelector('.level-value').innerText = 1
    
    updateCountdown()
    
}

function updateMessage(change) {
    let message = document.querySelector('.message')
    message.innerText = change
}

let userText = document.querySelector('#username')
function enterUsername() {
    document.querySelector('.onload-page').classList.remove('hidden')


}


window.addEventListener('load', enterUsername)

let correctSteps = []
let userSteps = []



function nextpage() {
    if (userText.value == '') {
        document.querySelector('.error-text').classList.remove('hidden')
        return false
    }
    document.querySelector('.onload-page').classList.add('hidden')
    localStorage.setItem('value', userText.value)
    document.querySelector('.user-value').innerText = localStorage.getItem('value')
}

function highlightRandomButton() {
    let buttons = document.querySelectorAll('.game-box')
    
    buttons.forEach(button => {
        button.classList.remove('highlight');
    });
    
    setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * buttons.length);
    correctSteps.push(randomIndex)
    const randomButton = buttons[randomIndex];
    randomButton.classList.add('highlight')
    setTimeout(() => {
        randomButton.classList.remove('highlight');
    }, 500)
    },3500)


}


function highlightClickedButton(index){
    let buttons = document.querySelectorAll('.game-box')

    buttons.forEach(button => {
        button.classList.remove('highlight');
    });

    const clickedButton = document.querySelectorAll('.game-box')[index];
            clickedButton.classList.add('highlight');

            setTimeout(() => {
                clickedButton.classList.remove('highlight');
            }, 1000);
            
            userSteps.push(index)

            areArraysEqual()
            
            userWon()

          
        }

        function areArraysEqual() {
            if (correctSteps.length !== userSteps.length) {
                return false;
            }

            
            for (let i = 0; i < correctSteps.length; i++) {
                if (correctSteps[i] !== userSteps[i]) {
                    return false;
                }
                console.log(true)
            }

            return true;
            console.log(true)
        }

        function userWon(){
            if(areArraysEqual()===true){
                updateMessage('you won')
                
            }
            else{
                updateMessage('you lost')
            }
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

   