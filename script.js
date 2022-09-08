import Deck, { Card } from './cardDeck.js'

const CARD_VALUE_MAP = {
    "A" : 1,
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10" : 10,
    "J" : 11,
    "Q" : 12,
    "K" : 13
}

// Define document objects
let computerScore = document.getElementById('computer_count')
let playerScore = document.getElementById('player_count')
let computerDiv = document.getElementById('computer')
let playerDiv = document.getElementById('player')
let flipButton = document.getElementById('flip-btn')

// Initialize decks
const masterDeck = new Deck()
masterDeck.shuffle()
// let [computerDeck, playerDeck] = masterDeck.split()
// Since game was too long I made a half shuffle function
let halfDeck = masterDeck.getHalfShuffledDeck()
let [computerDeck, playerDeck] = halfDeck.split()
console.log(halfDeck)

// Initialize board score and cards
computerScore.innerText = 26
playerScore.innerText = 26
let ace = new Card('♥', 'A')                   // default cards 
let club = new Card('♣', 'A')                  // default cards 
computerDiv.innerHTML = `${ace.getHTML()}`
playerDiv.innerHTML = `${club.getHTML()}`
let inRound, stop

// Button flip logic
flipButton.onclick = flipCards

function startGame(){
    // const masterDeck = new Deck()
    // masterDeck.shuffle()
    // let [computerDeck, playerDeck] = masterDeck.split()
    inRound = false
    cleanBoard()
}

function cleanBoard(){
    inRound = false
    playerDiv.innerHTML = ''
    computerDiv.innerHTML = ''
    updateDeckCount()
}

function updateDeckCount(){
    console.log(playerDeck.size())
    console.log(computerDeck.size())
    playerScore.innerText = playerDeck.size()
    computerScore.innerText = computerDeck.size()
}

function flipCards(){
    console.log(playerDeck.size())
    inRound = true
    // get new cards
    let computerCard = computerDeck.removeTopCard()
    let playerCard = playerDeck.removeTopCard()
    // show cards on left side
    computerDiv.innerHTML = `${computerCard.getHTML()}`
    playerDiv.innerHTML = `${playerCard.getHTML()}`
    // compare cards
    let winnerCard = pickRoundWinner(computerCard, playerCard)
    if(winnerCard == computerCard){
        computerDeck.addCard(computerCard)
        computerDeck.addCard(playerCard)
    }
    else if(winnerCard == playerCard){
        playerDeck.addCard(computerCard)
        playerDeck.addCard(playerCard)
    }
    updateDeckCount()
    if(isGameOver(playerDeck)){
        alert("You Lose!")
        stop = true
    }
    else if(isGameOver(computerDeck)){
        alert("You Win!")
        stop = true
    }
}

function pickRoundWinner(cardA, cardB){
    let A = CARD_VALUE_MAP[`${cardA.value}`]
    let B = CARD_VALUE_MAP[`${cardB.value}`]
    if(A > B){ return cardA }
    else if(B > A){return cardB}
    else {war()}                    // WORK IN PROGRESS
}
function war(){
    // This function should handle the case if both cards
    // are equal and draw 4 cards then re compare
    let cardA1 = computerDeck.removeTopCard()
    // let cardA2 = computerDeck.removeTopCard()
    let cardB1 = playerDeck.removeTopCard()
    // let cardB2 = playerDeck.removeTopCard()
    if(CARD_VALUE_MAP[cardA1.value] > CARD_VALUE_MAP[cardB1.value]){
        computerDeck.addCard(cardA1)
        // computerDeck.addCard(cardA2)
        computerDeck.addCard(cardB1)
        // computerDeck.addCard(cardB2)
        return cardA1
    } else {
        playerDeck.addCard(cardA1)
        // playerDeck.addCard(cardA2)
        playerDeck.addCard(cardB1)
        // playerDeck.addCard(cardB2)
        return cardB1
    }
}

function isGameOver(playerDeck){
    return playerDeck.size() == 0
}

startGame()