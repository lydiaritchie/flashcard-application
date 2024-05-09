import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Study from "./Study";
import EditDeck from "./EditDeck";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import Card from "../cards/Card";
import NotFound from "../Layout/NotFound";
import ErrorMessage from "../common/ErrorMessage";

function Decks({decks, setDecks}) {

    return (
        <div>
            <Routes>
                {/* Need to add the deckId */}
                <Route path="/new" element={<CreateDeck decks={decks} setDecks={setDecks}/>}/>
                <Route path="/:deckId" element={<Deck decks={decks} setDecks={setDecks} />}/>
                <Route path="/:deckId/study" element={<Study decks={decks} />}/> 
                <Route path="/:deckId/edit" element={<EditDeck decks={decks} setDecks={setDecks}/>}/> 
                <Route path="/:deckId/cards/*" element={<Card decks={decks} setDecks={setDecks}/>}/> 
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Decks;                