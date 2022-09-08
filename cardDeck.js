const SUITS = ['♥','♦','♠','♣']
const VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

export default class Deck{
    constructor(cards = freshDeck()){
        this.cards = cards
    }
    size(){ 
        return this.cards.length
    }
    shuffle(){
        const n = this.size()
        for(let i=0; i<n; i++){
            let randomIndex = Math.floor(Math.random() * n)
            while(randomIndex == i){
                randomIndex = Math.floor(Math.random() * n)
            }
            swap(i,randomIndex,this.cards)
        }
    }
    removeTopCard(){
        let topCard = this.cards[0]
        this.cards.shift()
        return topCard
        // return this.cards.pop()
    }
    addCard(card){
        this.cards.push(card)
    }
    split(){
        let cardsA = []
        let cardsB = []
        for(let i=0; i<this.size(); i++){
            if(i<this.size()/2){
                cardsA.push(this.cards[i])
            }
            else {
                cardsB.push(this.cards[i])
            }
        }
        let deckA = new Deck(cardsA)
        let deckB = new Deck(cardsB)
        return [deckA, deckB]
    }
    getHalfShuffledDeck(){
        let half = []
        for(let i = 0; i < 14; i++){
            half.push(this.cards[i])
        }
        // console.log(cards.length())
        let halfDeck = new Deck(half)
        return halfDeck
    }
}

export class Card{
    constructor(suit, value){
        this.suit = suit
        this.value = value
    }
    getColor(){
        return this.suit == '♥' || this.suit == '♦' ? 'red' : 'black'
    }
    getHTML(){
        const cardHTML = document.createElement('p')
        cardHTML.innerHTML = `${this.value} <span class="${this.getColor()}">${this.suit}</span>`
        // return cardHTML
        let html = `${this.value} <span class="${this.getColor()}">${this.suit}</span>`
        return html
        // <p>10 <span class="red">♥</span></p>
    }
}

function freshDeck(){
    return SUITS.flatMap(suit => {          // flatMap merges lists into one list
        return VALUES.map(value => {        // if you forgot what it is change it to map 
            return new Card(suit, value)    // and see the difference lol
        })
    })
}

function swap(a,b,list){
    if(a < 0 || a >= list.length || b < 0 || b >= list.length){
        console.log("Enter a valid index")
    }
    else {
        [list[a], list[b]] = [list[b], list[a]]
    }
}


