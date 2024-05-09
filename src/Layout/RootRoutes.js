import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import { listDecks } from "../utils/api";
import NotFound from "./NotFound";
import Decks from "../decks/Decks";
/*

This is for the Primary Routes.

*/

function RootRoutes() {
  //the highest level to initiate the state so that
  //everyone has access to them!
  const [decks, setDecks] = useState([]);

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
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home decks={decks} setDecks={setDecks} />} />
        <Route
          path="/decks/*"
          element={<Decks decks={decks} setDecks={setDecks} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default RootRoutes;
