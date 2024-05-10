import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCard, createCard, listDecks } from "../utils/api";
import ErrorMessage from "../common/ErrorMessage";

//card is the object of the current card. This will be passed in from EditCard.
//if card is undefined, then create a new card
function CardForm({ deckId, card }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (card) {
      setFront(card.front);
      setBack(card.back);
      console.log(`front: ${front} back: ${back}`);
    }

  }, [card]);

  console.log(card);

  //console.log("cardId: " + cardId);
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "front") {
      setFront(value);
    } else {
      setBack(value); 
    }
  }


  //handeSubmit() to add the card to the deck
  async function handleSubmit(event) {
    event.preventDefault();
    //console.log("The form was submitted!");
    if (card) {
      const updatedCard = {
        ...card,
        front: front,
        back: back,
      };

      try {
        await updateCard(updatedCard);
      } catch (error) {
        console.log("error " + error);
      }

      //console.log("before: "+JSON.stringify(result));

      //update the decks state to match the API
      //const deckList = await listDecks();
      //const deck = await readDeck(deckId);
      //setDecks(deckList);
      //console.log("deck: " + deck);
      navigate(-1);
    } else {
      try {
        await createCard(deckId, { front: front, back: back });
        navigate(-1);
      } catch (error) {
        return <ErrorMessage />;
      }
    }
  }

  return (
    <form className="col" onSubmit={handleSubmit}>
      <label className="col" htmlFor="name">
        Front
      </label>
      {card ? (
        <textarea
          className="col"
          name="front"
          onChange={handleChange}
          value={front}
          required
        />
      ) : (
        <textarea
          className="col"
          name="front"
          placeholder="Front side of card"
          onChange={handleChange}
          value={front}
          required
        />
      )}

      <label className="col" htmlFor="description">
        Back
      </label>
      {card ? (
        <textarea
          className="col"
          name="back"
          onChange={handleChange}
          value={back}
          required
        />
      ) : (
        <textarea
          placeholder="Back side of card"
          className="col"
          name="back"
          onChange={handleChange}
          value={back}
          required
        />
      )}

      <Link to={`/decks/${deckId}`} className="btn btn-danger">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default CardForm;
