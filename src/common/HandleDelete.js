import React from "react";
import { listDecks, deleteDeck } from "../utils/api";


//Deletes the selcted card
function deleteHandler(id, { setDecks }, nav) {

  async function remove() {
    if (window.confirm("Delete this deck?")) {
      await deleteDeck(id);
      const updatedDeckList = await listDecks();
      setDecks(updatedDeckList);
      nav("/");
    }
  }

  remove();
}

export default deleteHandler;
