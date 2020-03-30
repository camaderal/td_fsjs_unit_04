/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase{

    /**
     * Constructor for Phrase class
     * 
     * @param {String} phrase: string that needs to be guessed.
     */
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Reinitializes and adds letter placeholders to the display when the game starts.
     * 
     */
    addPhraseToDisplay(){
        const letters = this.phrase.split("");
        const phraseUl = document.querySelector("#phrase ul");
        phraseUl.innerHTML = "";

        letters.forEach(letter => {
            const letterLi = document.createElement("li");
            if(letter === " "){
                letterLi.classList.add("space");
                letterLi.textContent = " ";
            }else{
                letterLi.classList.add("hide");
                letterLi.classList.add("letter");
                letterLi.classList.add(letter);
                letterLi.textContent = letter;
            }
            phraseUl.appendChild(letterLi);
        });

        percentSpan.textContent = `0% decoded...`;
    }

    /**
     * Checks whether the selected character is part of the phrase.
     * 
     * @param {String} selectedCharacter: character selected by the player
     * @returns {boolean} true: part of the phrase; false: not part of the phrase
     */
    checkLetter(selectedCharacter){
        return this.phrase.includes(selectedCharacter);
    }

    /**
     * Reveals the letter(s) on the board that matches the player's selection
     * 
     * @param {String} matchedLetter: Letter selected by the player that has matched the phrase
     */
    showMatchedLetter(matchedLetter){
        // select li object that has the same class name as the matched letter
        const matchedLetterLis = document.querySelectorAll(`#phrase>ul>li.${matchedLetter}`);

        matchedLetterLis.forEach( matchedLetterLi => {
            matchedLetterLi.classList.remove("hide");
            matchedLetterLi.classList.add("show");
        });

        const shownLetterLis = document.querySelectorAll(`#phrase>ul>li.show`);
        let percent= Math.round((shownLetterLis.length/this.phrase.length) * 100);
        percentSpan.textContent = `${percent}% decoded...`;
    }
}