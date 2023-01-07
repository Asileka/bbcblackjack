import { CCard, CCardHeader, CRow, CCol, CContainer } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilChevronCircleUpAlt } from "@coreui/icons";
import React, { useState } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";

let startDeck = [
  { card: "2", suitsymbol: "♠", suit: "spades", id: 1, value: 2 },
  { card: "5", suitsymbol: "♦", suit: "diamonds", id: 2, value: 5 },
  { card: "K", suitsymbol: "♣", suit: "clubs", id: 3, value: 10 },
  { card: "Q", suitsymbol: "♣", suit: "clubs", id: 4, value: 10 },
  { card: "4", suitsymbol: "♥", suit: "hearts", id: 5, value: 4 },
  { card: "A", suitsymbol: "♥", suit: "hearts", id: 6, value: 1 },
];

const calculateScore = (hand) =>
  hand.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );

function App() {
  const [playerHand, setPlayerHand] = useState([]);
  const [deck, setDeck] = useState(startDeck);
  const [gameResult, setGameResult] = useState("Good Luck!");
  const [gameEnd, setGameEnd] = useState(false);
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
  let dealersScore = 17;
  let validHand = true;
  if (score > 21) {
    validHand = false;
  }
  function hit() {
    getRandomCard(deck);
  }
  function stand() {
    setGameEnd(true);
    if (validHand && score > dealersScore) {
      setGameResult("You Win!");
    } else {
      setGameResult("You Lose!");
    }
  }
  function switchAceValue(i) {
    let newPlayerHand = [...playerHand];
    if (newPlayerHand[i].value === 1) {
      newPlayerHand[i].value = 11;
    } else {
      newPlayerHand[i].value = 1;
    }
    setPlayerHand(newPlayerHand);
  }
  return (
    <CContainer>
      <CRow>
        <CCol className="text-center">
          <h1>{gameResult}</h1>
        </CCol>
      </CRow>
      <CRow className="justify-content-center">
        <CCard
          color="warning"
          textColor="white"
          className="text-center"
          style={{ maxWidth: "10rem" }}
        >
          <CCardHeader>Dealer's score:</CCardHeader>
          <CCardBody>
            <CCardTitle>{gameEnd ? dealersScore : "?"}</CCardTitle>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className="justify-content-center mb-4">
        <CCard
          color={validHand ? "success" : "danger"}
          textColor="white"
          className="text-center"
          style={{ maxWidth: "10rem" }}
        >
          <CCardHeader>Your score:</CCardHeader>
          <CCardBody>
            <CCardTitle>{score}</CCardTitle>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className="justify-content-center">
        <CCol xs={1}>
          <CButton
            color="light"
            onClick={hit}
            type="button"
            disabled={!validHand}
          >
            Hit
          </CButton>
        </CCol>
        <CCol xs={1}>
          <CButton
            color="light"
            onClick={stand}
            type="button"
            disabled={gameEnd}
          >
            Stand
          </CButton>
        </CCol>
      </CRow>

      <CRow className="justify-content-center">
        {playerHand.map((x, i) => {
          return (
            <CCard
              style={{ width: "7rem", height: "10rem", marginLeft: "1rem" }}
              key={x.id}
            >
              <CCardBody>
                <CCardTitle>
                  {x.card} {x.suitsymbol}
                </CCardTitle>

                {x.card === "A" ? (
                  <CRow className="align-items-center">
                    <CCol>
                      <CCardText style={{ marginTop: "1.5rem" }}>
                        {x.value}
                        <CIcon
                          icon={cilChevronCircleUpAlt}
                          size="xl"
                          type="button"
                          onClick={() => switchAceValue(i)}
                        />
                      </CCardText>
                    </CCol>
                  </CRow>
                ) : (
                  <CCardText></CCardText>
                )}
              </CCardBody>
            </CCard>
          );
        })}
      </CRow>
    </CContainer>
  );
}

export default App;
