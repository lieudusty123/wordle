import { WORDS } from "./wordsArr.js"

const inputContainer = document.querySelector('#inputContainer')
const input = document.querySelector('#mainInput')
input.disabled = true
const newGameButton = document.querySelector('#newGameButton')
let chosenWord;


const infoSection = document.querySelector('#info')
const divOutput = document.createElement('div')
divOutput.id = 'divOutput'
document.querySelector('main').insertBefore(divOutput, infoSection)

let displayCorrectWord = document.createElement('div')
displayCorrectWord.id = 'displayCorrectWord'
let main = document.querySelector('main')
main.insertBefore(displayCorrectWord, main.firstChild);


newGameButton.addEventListener('click', (e) => {
    e.preventDefault()
    chosenWord = wordGenerator()
    console.log(chosenWord)
    attempts = 0;
    divOutput.innerHTML = ''
    displayCorrectWord.innerHTML = ''
    input.placeholder = ''
    input.disabled = false
})

input.addEventListener('input', (e) => {
    if (e.target.value.charAt(4) != '') {
        checkLetters(e.target.value)
        e.target.value = ''

    }
})

function wordGenerator() {
    // console.log(WORDS)
    return WORDS[Math.floor(Math.random() * WORDS.length)]
}




let attempts = 0;
function checkLetters(newWordInput) {

    let printedWordArr = []
    if (WORDS.indexOf(newWordInput) >= 0) {
        displayCorrectWord.textContent = '';
        for (let index = 0; index < newWordInput.length; index++) {
            let letterPosition = chosenWord.indexOf(newWordInput[index])
            let newWord = document.createElement('span')
            newWord.className = 'printedWord'
            newWord.textContent = `${newWordInput[index]}`
            if (letterPosition === -1) {
                // console.log('not in word')
                newWord.style.backgroundColor = 'darkgrey'
            }

            else {
                if (chosenWord[index] == newWordInput[index]) {
                    // console.log("exact")
                    newWord.style.backgroundColor = 'lightgreen'
                }
                else if (chosenWord.split(newWordInput[index]).length - 1 == newWordInput.split(newWordInput[index]).length - 1) {

                    // console.log('not quite')
                    newWord.style.backgroundColor = 'yellow'
                }
                else {
                    // console.log('not in word')
                    newWord.style.backgroundColor = 'darkgrey'
                }
            }
            printedWordArr.push(newWord)
        }
        attempts += 1
        // console.log(attempts)
        if (attempts >= 5) {
            input.disabled = true
            displayCorrectWord.innerHTML = `The correct word was: ${chosenWord}`
            createDiv(printedWordArr)

        }
        else {
            createDiv(printedWordArr)
        }
    }
    else {
        displayCorrectWord.textContent = 'please write an actual word'
    }


}

function createDiv(arr) {
    const divOutput = document.querySelector('#divOutput')
    let wordPlacment = document.createElement('div')
    wordPlacment.id = 'wordPlacment'
    divOutput.append(wordPlacment)
    let correctIndex = 0
    let index = 0;
    arr.forEach(letter => {
        wordPlacment.append(letter)
        if (letter.style.backgroundColor == 'lightgreen') {
            correctIndex += 1
        }

        if (correctIndex == 5) {
            const fireworks = document.querySelectorAll('lottie-player')
            console.log(fireworks)
            fireworks.forEach(element => {
                element.style.display = 'block'
                element.style.opacity = '100'
            })
            setTimeout(() => {
                fireworks.forEach(element => {
                    element.style.display = 'none'
                    setTimeout(() => {
                        element.style.opacity = '0'
                    }, 3000);
                })
            }, 4000);
            input.disabled = true
            displayCorrectWord.innerHTML = `You are correct!`
            correctIndex = 0;
        }


    })

}
