/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

const MAX_TRIES = 5;

class Game{

    /**
     * Constructor for Game class
     * 
     */
    constructor(){
        
        // initialize missed
        this.missed = 0;

        // initialize phrases
        this.phrases = [
            new Phrase("Speak of the devil"), 
            new Phrase("Beat around the bush"), 
            new Phrase("No pain no gain"), 
            new Phrase("Ignorance is bliss"),
            new Phrase("Curiosity killed the cat")
        ];
        this.activePhrase = null;
        
        // saves all key buttons on a map (key: letter, value: key button element)
        const keyButtons = document.querySelectorAll("#qwerty button");
        this.keysButtonMap = [];
        keyButtons.forEach( keyButton => {
            this.keysButtonMap[keyButton.textContent] = keyButton;
        });

        // initialize scoreboard
        const hearts = document.querySelectorAll("#scoreboard img"); 
        for(let i=0; i < MAX_TRIES; i++){            
            hearts[i].src = "images/liveHeart.png";
        }

        // initialized chosen letters
        this.chosenLetters = [];
        for(let key in this.keysButtonMap){
            this.keysButtonMap[key].classList.remove("chosen");
            this.keysButtonMap[key].classList.remove("wrong");
            this.keysButtonMap[key].disabled =false;
        }

        // game hasn't started yet
        this.gameInProgress = false;
    }

    /**
     * Starts the game.
     */
    startGame(){
        // initialize new phrase
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

        // State that game is in progress
        this.gameInProgress = true;

        // remove overlay
        this.showOrHideOverlay(false);
    }

    /**
     * Generate a random phrase from a predetermined list.
     */
    getRandomPhrase(){
        const phraseIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[phraseIndex];
    }

    /**
     * Controls the game logic that starts with choosing a letter.
     * 
     * @param {String} letter chosen
     */
    handleInteraction(letter){
        // If game is not in progress, reject letter key clicks and presses
        if(!this.gameInProgress){
            return;
        }

        // check if already guessed
        if(this.chosenLetters.includes(letter)){
            return;
        }

        // when previously not chosen, add to chosen list
        this.chosenLetters.push(letter);
        this.keysButtonMap[letter].disabled = true;
        
        // check whether the selected letter is part of the phrase
        if(this.activePhrase.checkLetter(letter)){
            this.keysButtonMap[letter].classList.add("chosen");
            this.activePhrase.showMatchedLetter(letter);

            if(this.checkForWin()){
                this.gameOver(true);
            }

            correctSound.cloneNode().play();
        }else{
            this.keysButtonMap[letter].classList.add("wrong");
            this.removeLife();    

            wrongSound.cloneNode().play();
        }

    }

    /**
     * Checks whether all letters have been revealed.
     */
    checkForWin(){
        if(document.querySelector(`#phrase>ul>li.hide`)){
            return false;
        }
        return true;
    }

    /**
     * Removes a life.
     */
    removeLife(){
        this.missed++;
        const hearts = document.querySelectorAll("#scoreboard img"); 
        hearts[hearts.length - this.missed].src = "images/lostHeart.png";

        if (this.missed >= MAX_TRIES){
            this.gameOver(false);
        }
    }

    /**
     * Ends the game.
     * 
     * @param {Boolean} win. true: game has been won. false: game has been lost.
     */
    gameOver(win){       
        const overlayH1 = document.getElementById("game-over-message");
        if(win){
            overlayH1.textContent = "You won!";
            overlayH1.classList.add("win");
            overlayH1.classList.remove("lose");
    
            winSound.play();
        }else{
            overlayH1.textContent = "You lose!";
            overlayH1.classList.remove("win");
            overlayH1.classList.add("lose");

            loseSound.play();
        }

        this.gameInProgress = false;
        this.showOrHideOverlay(true);

        bgmSound.pause();
    }

    /**
     * Shows or hides the overlay.
     * 
     * @param {Boolean} show 
     */
    showOrHideOverlay(show){
        const overlayDiv = document.getElementById("overlay");
        if(show){
            overlayDiv.style.display = "";
        }else{
            overlayDiv.style.display = "none";
        }
        
    }

}