import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api";

//

function Study({ decks, setDecks }) {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]); //cards array to iterate through 
  const [deck, setDeck] = useState({}); //the current deck
  const [currentCard, setCurrentCard] = useState({}); //the current card object that is being displayed
  const [displayCard, setDisplayCard] = useState(""); //the jsx of the card being displayed
  const [isFront, setIsFront] = useState(true); //whether or not the front is showing
  const cardsLength = cards.length; //the length of the cards array used in the display and to check if there are at least 3 cards
  const navigate = useNavigate(); //to navigate to another page once certain buttons are clicked

  //get the current deck
  useEffect(() => {
    async function getDeck() {
      try {
        const deck = await readDeck(deckId);
        setDeck(deck);
        setCards(deck.cards);
        setCurrentCard(deck.cards[0]);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDeck();
  }, [decks]);

 //to set the card that is currently displaying
  useEffect(() => {
    if (cards.length >= 3 && currentCard) {
      setDisplayCard(
        <div>
          {isFront ? (
            <div>
              <p>{currentCard.front}</p>
              <button onClick={handleFlip} className="btn btn-secondary">
                Flip
              </button>
            </div>
          ) : (
            <div>
              <p>{currentCard.back}</p>
              <button onClick={handleFlip} className="btn btn-secondary">
                Flip
              </button>
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            </div>
          )}
        </div>
      );
    }
  }, [currentCard, isFront]);


  //jsx for when there aren't enough cards
  const notEnoughCards = (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cardsLength} cards in the
        deck.
      </p>
    </div>
  );
  
  //handle the next button to switch to the next card in the stack
  function handleNext() {
    setIsFront(true);
    const currentIndex = cards.indexOf(currentCard);
    if (cards[currentIndex + 1]) {
      setCurrentCard(cards[currentIndex + 1]);
    } else {
      if (
        window.confirm(
          "Restart cards? Click cancel to return to the home page."
        )
      ) {
        navigate("/");
      } else {
        setCurrentCard(cards[0]);
      }
    }
  }

  //handle the flip button to switch from front to back
  function handleFlip() {
    setIsFront(!isFront);
  }


    //nav bar for top of the page
    const navBar = (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`} >{deck.name}</Link>
          </li>
          <li className="breadcrumb-item text-secondary">Study</li>
        </ol>
      </nav>
    );


  return (
    <div>
      {navBar}
      <h2>{deck.name}: Study</h2>
      {/* To check how many cards there are */}
      {cardsLength < 3 ? (
        notEnoughCards
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cards.indexOf(currentCard) + 1} of {cards.length}
            </h5>
            <div className="card-text">{displayCard}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Study;
