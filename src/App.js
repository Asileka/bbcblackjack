import { CCard, CCardHeader } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import { CButton } from "@coreui/react";
import React, { useState } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";

let startDeck = [
  { card: "2", suitsymbol: "♠", suit: "spades", id: 1, value: 2 },
  { card: "5", suitsymbol: "♦", suit: "diamonds", id: 2, value: 5 },
  { card: "K", suitsymbol: "♣", suit: "clubs", id: 3, value: 10 },
  { card: "Q", suitsymbol: "♣", suit: "clubs", id: 4, value: 10 },
];

const calculateScore = (hand) =>
  hand.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );

function App() {
  const [playerHand, setPlayerHand] = useState([]);
  const [deck, setDeck] = useState(startDeck);
  const [gameResult, setGameResult] = useState("");
  const [disableStand, setDisableStand] = useState(false);
  function getRandomCard() {
    const cardIndex = Math.floor(Math.random() * deck.length);
    const randomCard = deck[cardIndex];

    setPlayerHand([...playerHand, randomCard]);
    setDeck([...deck.filter((val) => val.id !== randomCard.id)]);
  }

  if (playerHand.length < 2) {
    getRandomCard(deck);
    getRandomCard(deck);
  }

  const score = calculateScore(playerHand);
  let validHand = true;
  if (score > 21) {
    validHand = false;
  }
  function hit() {
    getRandomCard(deck);
  }
  function stand() {
    setDisableStand(true);
    if (validHand) {
      setGameResult("You Win!");
    } else {
      setGameResult("You Lose!");
    }
  }
  return (
    <div className="App">
      <CButton color="light" onClick={hit} type="button" disabled={!validHand}>
        Hit
      </CButton>
      <CButton
        color="light"
        onClick={stand}
        type="button"
        disabled={disableStand}
      >
        Stand
      </CButton>
      <h1>{gameResult}</h1>
      <CCard
        color={validHand ? "success" : "danger"}
        textColor="white"
        className="mb-3"
        style={{ maxWidth: "5rem" }}
      >
        <CCardHeader>Score:</CCardHeader>
        <CCardBody>
          <CCardTitle>{score}</CCardTitle>
        </CCardBody>
      </CCard>
      <div>
        {playerHand.map((x) => {
          return (
            <CCard style={{ width: "7rem" }} key={x.id}>
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
