import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import { listDecks } from "../utils/api";
import NotFound from "./NotFound";
import Decks from "../decks/Decks";

function RootRoutes() {
  const [decks, setDecks] = useState([]);

  //get the list of decks from the API
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
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home decks={decks} setDecks={setDecks} />} />
        <Route path="/decks/*" element={<Decks decks={decks} setDecks={setDecks} />}/>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default RootRoutes;
