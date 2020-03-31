/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const overlayDiv = document.getElementById("overlay");
const appGameBtn = document.getElementById("btn__reset");
const qwerty = document.getElementById("qwerty");

// Add event listeners to the start game button
appGameBtn.addEventListener( "click", (e)=>{
    if(e.target.id === "btn__reset"){
        const currentGameInstance = new Game();
        currentGameInstance.startGame();

        // Add event listeners to the letter key button
        qwerty.addEventListener("click", (e) => {    
            // letter key button clicked event handling
            if(e.type === "click" && e.target.type === "submit"){
                currentGameInstance.handleInteraction(e.target.textContent);
            }
        });

        // Add event listeners to the letter keyup presses
        document.addEventListener("keyup", (e) => {
            // letter keyup event handling
            let key = e.key;
            if((e.type === "keyup") && /^[a-zA-Z]$/.test(key)){
                currentGameInstance.handleInteraction(key.toLowerCase());
            }
        });
    }
});

// Create percentage element
const phraseDiv = document.getElementById("phrase");
const percentDiv = document.createElement("div");
const percentSpan = document.createElement("span");
percentDiv.id = "percent";
percentDiv.className = "section"
percentDiv.appendChild(percentSpan);
phraseDiv.appendChild(percentDiv);
