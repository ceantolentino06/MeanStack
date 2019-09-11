class Card{
    constructor(suit, sVal, nVal){
        this.suit = suit;
        this.sVal = sVal;
        this.nVal = nVal;
    }

    show(){
        return `${ this.sVal } of ${ this.suit }. VALUE: ${ this.nVal }`
    }
}

class Deck{
    constructor(deck){
        this.deck = deck;
    }
}