import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import  HandleDelete from "../common/HandleDelete";
import { deleteCard, readDeck, listDecks } from "../utils/api";


function Deck({ decks, setDecks, deck, setDeck}) {
  const { deckId } = useParams();
  const navigate = useNavigate({});
  const [cards, setCards] = useState([]);
  const [navBar, setNavBar] = useState("");

  //component to retrieve the list of cards
  useEffect(() => {
    async function getCards() {
      try {
        const deck = await readDeck(deckId);
        setCards(deck.cards);
        //console.log(cards);
      } catch (error) {
        console.log(error.message);
      }
    }
    getCards();
  }, [decks]);

  //handles deleting the card
  async function HandleDeleteCard(id){
    if(window.confirm("Delete this card?")) {
      await deleteCard(id)
      const updatedDeckList = await listDecks();
      setDecks(updatedDeckList);
    }
  }

  //component to generate the list of cards
  const cardsList = cards.map((card) => {
    return (
      <div className="list-group-item">
        <div className="row text-secondary">
          <p className="col">{card.front}</p>
          <p className="col">{card.back}</p>
        </div>
        <div className="cardSubtitle alignRight">
          <Link to={`cards/${card.id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <button className="btn btn-danger" 
          onClick={() => HandleDeleteCard(card.id)}
          >Delete</button>
        </div>
      </div>
    );
  });
  

  //render the navbar when deck is loaded
  useEffect(() => {
    async function getNavBar() {
      try {

        setNavBar(
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item text-secondary">{deck.name}</li>
            </ol>
          </nav>
        );
      } catch (error) {
        console.log(error.message);
      }
    }
    getNavBar();
  }, [decks]);

  return (
    <div>
      {/* Conditionally check if deck has been loaded before trying to render the components. */}
      {deck && (
        <div>
          {navBar}
          <h1>{deck.name}</h1>
          <p>{deck.description}</p>
          {/* The row of buttons at the top of the page */}
          <div className="row">
            <div className="col col-9 backgroundTest">
              <Link to="edit" className="btn btn-secondary">
                Edit
              </Link>
              <Link to="study" className="btn btn-primary">
                Study
              </Link>
              <Link to="cards/new" className="btn btn-primary">
                Add Card
              </Link>
            </div>
            <div>
              <div className="col col-3 backgroundTest">
                <button
                  className="btn btn-danger iconButton"
                  onClick={() => HandleDelete(deck.id, { setDecks }, navigate)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flashcards */}
      <div className="card">
        <div className="list-group list-group-flush">{cardsList}</div>
      </div>
    </div>
  );
}

export default Deck;
