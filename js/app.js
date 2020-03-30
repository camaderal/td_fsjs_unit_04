/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const overlayDiv = document.getElementById("overlay");
const appGameBtn = document.getElementById("btn__reset");

const currentGameInstance = new Game();

// Add event listeners to the start game button
appGameBtn.addEventListener( "click", (e)=>{
    if(e.target.id === "btn__reset"){
        currentGameInstance.startGame();
    }
});

// Add event listeners to the letter key buttons
const qwerty = document.getElementById("qwerty");
qwerty.addEventListener("click", (e) => {
    currentGameInstance.handleInteraction(e);
});

// Add event listeners to the letter keyup presses
document.addEventListener("keyup", (e) => {
    currentGameInstance.handleInteraction(e);
});

// Create percentage element
const phraseDiv = document.getElementById("phrase");
const percentDiv = document.createElement("div");
const percentSpan = document.createElement("span");
phraseDiv.appendChild(percentDiv);
percentDiv.appendChild(percentSpan);

percentDiv.id = "percent";
percentDiv.className = "section"
percentSpan.textContent = "0% decoded..."
