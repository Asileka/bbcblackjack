import { CCard, CRow, CCol, CContainer } from "@coreui/react";
import { CCardBody } from "@coreui/react";
import { CCardTitle } from "@coreui/react";
import { CCardText } from "@coreui/react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilChevronCircleUpAlt } from "@coreui/icons";
import React, { useState } from "react";
import catdealerwaiting from "./images/catdealerwaiting.svg";
import catdealerwon from "./images/catdealerwon.svg";
import catdealershocked from "./images/catdealershocked.svg";
import DealerCard from "./DealerCard";
import startDeck from "./deck";
import "@coreui/coreui/dist/css/coreui.min.css";

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
  const [catPicture, setCatPicture] = useState(catdealerwaiting);
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
      setCatPicture(catdealershocked);
    } else {
      setGameResult("You Lose!");
      setCatPicture(catdealerwon);
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
  function playAgain() {
    setGameEnd(false);
    setPlayerHand([]);
    setDeck(startDeck);
    setCatPicture(catdealerwaiting);
    setGameResult("Good Luck!");
    if (playerHand.length < 2) {
      getRandomCard(deck);
      getRandomCard(deck);
    }
  }
  return (
    <CContainer>
      <CRow>
        <CCol className="text-center">
          <h1>{gameResult}</h1>
        </CCol>
      </CRow>
      <CRow className="justify-content-center">
        <CCol className="text-center">
          <img src={catPicture} alt="cat dealer" height="270" />
        </CCol>
      </CRow>
      <CRow className="justify-content-center mb-4">
        <DealerCard gameEnd={gameEnd} dealerCardName="7 ♣" />
        <DealerCard gameEnd={gameEnd} dealerCardName="K ♦" />
      </CRow>
      <CRow className="justify-content-center mb-2">
        <CCard
          color="warning"
          textColor="white"
          className="text-center"
          style={{
            maxWidth: "14rem",
            maxHeight: "4rem",
            marginRight: "1rem",
          }}
        >
          <CCardBody>
            <CCardTitle>
              Dealer's score: {gameEnd ? dealersScore : "?"}
            </CCardTitle>
          </CCardBody>
        </CCard>

        <CCard
          color={validHand ? "success" : "danger"}
          textColor="white"
          className="text-center"
          style={{ maxWidth: "14rem", maxHeight: "4rem" }}
        >
          <CCardBody>
            <CCardTitle>Your score: {score}</CCardTitle>
          </CCardBody>
        </CCard>
      </CRow>

      <CRow className="justify-content-center mb-2">
        <CCol xs={1}>
          <CButton
            color="light"
            onClick={hit}
            type="button"
            disabled={!validHand || gameEnd}
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
        {gameEnd ? (
          <CCol xs={1}>
            <CButton color="light" onClick={playAgain} type="button">
              Play Again
            </CButton>
          </CCol>
        ) : (
          ""
        )}
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
