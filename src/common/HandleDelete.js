import React from "react";
import { listDecks, deleteDeck } from "../utils/api";


//Deletes the selcted card
function deleteHandler(id, { setDecks }, nav) {


  async function remove() {
    if (window.confirm("Delete this deck?")) {
      //console.log("deckId: " + id);
      await deleteDeck(id);
      const updatedDeckList = await listDecks();
      setDecks(updatedDeckList);
      nav("/");
      //window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  remove();
}

export default deleteHandler;
