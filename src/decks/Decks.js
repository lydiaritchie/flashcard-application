import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import NotFound from "../Layout/NotFound";
import DeckIdRoutes from "./DeckIdRoutes";

//Routing to Decks that need the deckId and CreateDeck
function Decks({decks, setDecks}) {

    return (
        <div>
            <Routes>
                {/* Need to add the deckId */}
                <Route path="/new" element={<CreateDeck setDecks={setDecks}/>}/>
                <Route path="/:deckId/*" element={<DeckIdRoutes decks={decks} setDecks={setDecks}/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Decks;                
