import React from "react";
import { readCard, updateCard, listDecks, readDeck } from "../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CardForm from "./CardForm";

function EditCard({ deck, decks, setDecks }) {
  const { cardId, deckId } = useParams();
  const [card, setCard] = useState({});

  //get the card to pass through to CardForm
  //Runs once at the first render
  useEffect(() => {
    async function getCard() {
      const card = await readCard(cardId);
      setCard(card);
    }
    getCard();
  }, []);


  const navBar = (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`} state={deck}>
              {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item text-secondary">Edit Card</li>
        </ol>
      </nav>
    </div>
  );

  return (
    <div>
      {navBar}
      <h1>Edit Card</h1>
      <CardForm card={card} deckId={deckId} />
    </div>
  );
}

export default EditCard;
