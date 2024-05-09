/*
Home.js is to display the Home screen with the create deck button and the DeckList.

Organization:

Create deck button links to <CreateDeck />. Need to add the plus symbol.
<DeckList /> called to display all the decks. 

This is a seperate file to try to maintain the single responsibility principle.
*/

import React from "react";
import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home({decks, setDecks}) {

    return (
    <div className="col">
        <Routes>
            <Route path="" element={<DeckList  decks={decks} setDecks={setDecks}/>}/>
        </Routes>
    </div>
    )

}



export default Home;