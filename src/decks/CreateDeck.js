import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createDeck, listDecks } from "../utils/api";

//Page to Create a deck and add it to the decks array
function CreateDeck({ setDecks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const navBar = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item text-secondary">
          <Link to="/decks/new">Create Deck</Link>
        </li>
      </ol>
    </nav>
  );

  //handeSubmit() here
  async function handleSubmit(event) {
    event.preventDefault();
    //console.log("The form was submitted!");
    try {
      await createDeck({ name: name, description: description });
      console.log("created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  //handleChange for the input fields
  const handleChange = (event) => {
    if (event.target.placeholder == "Name") {
      setName(event.target.value);
      console.log("name: " + name);
    } else {
      setDescription(event.target.value);
      console.log("descriptioin: " + description);
    }
  };

  //this effect is to retrieve the list of decks from the API
  useEffect(() => {
    async function getDecks() {
      try {
        const deckList = await listDecks();
        setDecks(deckList);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDecks();
  }, [handleSubmit]);

  return (
    <div>
      {navBar}
      <h1>Create Deck</h1>

      <form className="col" onSubmit={handleSubmit}>
        <label className="col" htmlFor="name">
          Name
        </label>
        <input
          className="col"
          placeholder="Name"
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
          className="col"
          onChange={handleChange}
          value={description}
          required
        />

        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
