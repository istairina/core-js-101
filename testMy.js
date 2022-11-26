function getCardId(value) {
   const strCardOrder = "'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣','A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦','A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥','A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'";
   const arrCardOrder = strCardOrder.split(',');
    for (let i = 0; i < arrCardOrder.length; i += 1) {

        if (arrCardOrder[i].includes(value)) {
            return i;
        }
    }
   //console.log(arrCardOrder);
}


console.log(getCardId('A♣'));
console.log(getCardId('2♣'));
console.log(getCardId('K♠'));