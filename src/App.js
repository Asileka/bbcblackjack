import { CCard } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import { CButton } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
function App() {
  let deck = [
    { card: "1", suitsymbol: "♠", suit: "spades", id: 1, value: 1 },
    { card: "5", suitsymbol: "♦", suit: "diamonds", id: 2, value: 5 },
    { card: "K", suitsymbol: "♣", suit: "clubs", id: 3, value: 10 },
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

  function hit() {
    getRandomCard(deck);
  }
  return (
    <div className="App">
      <CButton color="light">Hit</CButton>
      <CButton color="light">Stand</CButton>
      <div>
        {playerHand.map((x) => {
          return (
            <CCard style={{ width: "10rem" }} key={x.id}>
              <CCardBody>
                <CCardTitle>
                  {x.card} {x.suitsymbol}
                </CCardTitle>
                <CCardText>card</CCardText>
              </CCardBody>
            </CCard>
          );
        })}
      </div>
    </div>
  );
}

export default App;
