import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck, listDecks } from "../utils/api";
import { useState, useEffect } from "react";

function EditDeck({ setDecks }) {
  const { deckId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deckName, setDeckName] = useState("");
  const [deck, setDeck] = useState({});
  const navigate = useNavigate();

  //retrieve the deck to Edit
  useEffect(() => {
    async function getDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
      setName(deck.name);
      setDeckName(deck.name);
      setDescription(deck.description);
    }
    getDeck();
  }, []);

  const navBar = (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item text-secondary">Edit Deck</li>
        </ol>
      </nav>
    </div>
  );

  //update the value each time the input changes
  function handleChange(event) {
    const name = event.target.name;
    if (name === "name") {
      setName(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  }

  //Update the card
  async function handleSubmit(event) {
    event.preventDefault();
    const newDeck = {
      id: deckId,
      name: name,
      description: description,
    };

    await updateDeck(newDeck);
    const deckList = await listDecks();
    setDecks(deckList);
    navigate(`/decks/${deckId}`);
  }


  return (
    <div>
      {navBar}
      <h1>Edit Deck</h1>

      <form className="col" onSubmit={handleSubmit}>
        <label className="col" htmlFor="name">
          Name
        </label>
        <input
          className="col text-secondary"
          placeholder="Name"
          name="name"
          type="text"
          onChange={handleChange}
          value={name}
          required
        />
        <label className="col" htmlFor="description">
          Description
        </label>
        <textarea
          placeholder="Brief description of the deck"
          className="col text-secondary"
          name="description"
          onChange={handleChange}
          value={description}
          required
        />

        <Link to={`../${deckId}`} className="btn btn-danger">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
