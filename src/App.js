import { CCard } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
function App() {
  let deck = [
    { card: "1", suitsymbol: "♠", suit: "spades" },
    { card: "5", suitsymbol: "♦", suit: "diamonds" },
    { card: "K", suitsymbol: "♣", suit: "clubs" },
  ];

  function getRandomCard(deckOfCards) {
    const cardIndex = Math.floor(Math.random() * deckOfCards.length);
    const randomCard = deckOfCards[cardIndex];
    deck.splice(cardIndex, 1);
    return randomCard;
  }

  const firstCard = getRandomCard(deck);
  deck.map((x, i) => {
    if (x == firstCard) {
      deck.splice(i, 1);
    }
  });

  console.log(deck.length);
  const secondCard = getRandomCard(deck);
  deck.map((x, i) => {
    if (x == secondCard) {
      deck.splice(i, 1);
    }
  });
  console.log(deck.length);
  return (
    <div className="App">
      <CCard style={{ width: "10rem" }}>
        <CCardBody>
          <CCardTitle>
            {firstCard.card} {firstCard.suitsymbol}
          </CCardTitle>
          <CCardText>card</CCardText>
        </CCardBody>
      </CCard>
      <CCard style={{ width: "10rem" }}>
        <CCardBody>
          <CCardTitle>
            {secondCard.card} {secondCard.suitsymbol}
          </CCardTitle>
          <CCardText>card</CCardText>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default App;
