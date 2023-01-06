import { CCard } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import { CButton } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
function App() {
  let deck = [
    { card: "1", suitsymbol: "♠", suit: "spades" },
    { card: "5", suitsymbol: "♦", suit: "diamonds" },
    { card: "K", suitsymbol: "♣", suit: "clubs" },
  ];
  const playerHand = [];
  function getRandomCard(deckOfCards) {
    const cardIndex = Math.floor(Math.random() * deckOfCards.length);
    const randomCard = deckOfCards[cardIndex];
    playerHand.push(randomCard);
    deck.splice(cardIndex, 1);
    return randomCard;
  }

  getRandomCard(deck);
  getRandomCard(deck);

  // function hit() {}
  return (
    <div className="App">
      <CButton color="light">Hit</CButton>
      <CButton color="light">Stand</CButton>
      <CCard style={{ width: "10rem" }}>
        <CCardBody>
          <CCardTitle>
            {playerHand[0].card} {playerHand[0].suitsymbol}
          </CCardTitle>
          <CCardText>card</CCardText>
        </CCardBody>
      </CCard>
      <CCard style={{ width: "10rem" }}>
        <CCardBody>
          <CCardTitle>
            {playerHand[1].card} {playerHand[1].suitsymbol}
          </CCardTitle>
          <CCardText>card</CCardText>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default App;
