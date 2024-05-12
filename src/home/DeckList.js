import React from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteHandler from "../common/HandleDelete";

//Displays all the deck on the home page
function DeckList({ decks, setDecks }) {
  const navigate = useNavigate();

  //mpa the deck into an array of jsx elements
  const deckCards = decks.map((deck) => {
    return (
      <div className="list-group-item" key={deck.id}>
        <div className="row">
          <h3 className="col col-9">{deck.name}</h3>
          <p className="col col-3 alignRight">{deck.cards.length} cards</p>
        </div>

        <p>{deck.description}</p>
        <div className="row">
          <div className="col col-9">
            <Link
              to={`/decks/${deck.id}`}
              className="btn btn-info"
            >
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
          </div>
          <div className="col col-3 text-right">
            <button
              className="btn btn-danger iconButton"
              onClick={() => deleteHandler(deck.id, { setDecks }, navigate)}
            >
              <span className="icon"></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
  
  return (
    <div>
      <Link className="row btn btn-primary" to="/decks/new">
        Create Deck
      </Link>
      <div className="card" key="deckList">
        <div className="list-group list-group-flush">{deckCards}</div>
      </div>
    </div>
  );
}

export default DeckList;
