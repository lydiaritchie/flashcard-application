import React from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteHandler from "../common/HandleDelete";

/*
This is a component which displays the decks in a list of cards. 
Each card should have the Deck title, description, view button and study button. 

View button links to <Deck /> component.
Study button links to <Study /> component.

Loop through all the decks, creating a card for each one. 
1. Retrieve the decks from listDecks() or readDeck()
   - with useEffect() and an async function
2. Log them to the consolse.
3. Map the decks form their array to a new array with the html card format.

*/
function DeckList({ decks, setDecks }) {
  const navigate = useNavigate();

  //console.log(decks.length);

  //console.log(`decks: ${JSON.stringify(decks)} type: ${typeof decks}`);

  //Here will be the map method to create a list of decks as cards.
  //for each deck, return the jsx structure

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
