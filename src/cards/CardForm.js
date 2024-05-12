import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCard, createCard } from "../utils/api";
import ErrorMessage from "../common/ErrorMessage";

//From for AddCard and EditCard
function CardForm({ deckId, card }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();

  //Card will be passed in from EditCard, but false will be passed in in its place from CreateCard
  //if there is a card it will be edited, if its false a new card will be created
  useEffect(() => {
    if (card) {
      setFront(card.front);
      setBack(card.back);
      console.log(`front: ${front} back: ${back}`);
    }
  }, [card]);

  console.log(card);

  //hadle a change to the textareas
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
    //if it is in editing mode
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
      navigate(-1);
    } else {
      //if it is adding the card
      try {
        await createCard(deckId, { front: front, back: back });
        navigate(0);
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
      {/* first is editing a card, second is adding a card */}
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

      {card ? (
        <>
          <Link to={`/decks/${deckId}`} className="btn btn-danger">
            Cancel
          </Link>
          <button type="submit" name="save" className="btn btn-primary">
            Submit
          </button>
        </>
      ) : (
        <>
          <Link to={`/decks/${deckId}`} className="btn btn-danger">
            Done
          </Link>
          <button type="submit" name="save" className="btn btn-primary">
            Save
          </button>
        </>
      )}
    </form>
  );
}

export default CardForm;
