/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
//common DOM elements
const overlayDiv = document.getElementById("overlay");
const appGameBtn = document.getElementById("btn__reset");
const qwerty = document.getElementById("qwerty");

// Create percentage element
const phraseDiv = document.getElementById("phrase");
const percentDiv = document.createElement("div");
const percentSpan = document.createElement("span");
percentDiv.id = "percent";
percentDiv.className = "section"
percentDiv.appendChild(percentSpan);
phraseDiv.appendChild(percentDiv);

//Sound elements
const correctSound = new Audio('./assets/correct.wav');
correctSound.preload = 'auto';
correctSound.load();

const wrongSound = new Audio('./assets/wrong.wav');
wrongSound.preload = 'auto';
wrongSound.load();

const winSound = new Audio('./assets/win.wav');
const loseSound = new Audio('./assets/lose.wav');
const bgmSound = new Audio('./assets/bgm.mp3');
bgmSound.loop = true;
bgmSound.volume = 0.5;

let currentGameInstance = null;

// letter key button clicked event handler
const letterButtonClick = (e) =>{
    if(e.type === "click" && e.target.type === "submit"){
        currentGameInstance.handleInteraction(e.target.textContent);
    }
}

// letter keyup event handler
const letterKeyup =  (e) => {
    let key = e.key;
    if((e.type === "keyup") && /^[a-zA-Z]$/.test(key)){
        currentGameInstance.handleInteraction(key.toLowerCase());
    }
}

// Add event listeners to the start game button
appGameBtn.addEventListener( "click", (e)=>{
    if(e.target.id === "btn__reset"){
        // remove listeners to previous game
        qwerty.removeEventListener("click", letterButtonClick);
        document.removeEventListener("keyup", letterKeyup);

        //create and start new game
        currentGameInstance = new Game();
        currentGameInstance.startGame();

        // Add event listeners to the letter key button
        qwerty.addEventListener("click", letterButtonClick);

        // Add event listeners to the letter keyup presses
        document.addEventListener("keyup", letterKeyup);

        // play main bgm
        bgmSound.currentTime = 0;
        bgmSound.play();
    }
});

