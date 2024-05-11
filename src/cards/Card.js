import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import NotFound from "../Layout/NotFound";

function Card({ decks }) {
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState({});
    
    //get deck as a prop to pass through
    useEffect(() => {
        async function getDeck() {
            const currentDeck = await readDeck(deckId);
            setDeck(currentDeck);
        }
        getDeck();
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/new" element={<AddCard deck={deck}/>}/>
                <Route path=":cardId/edit" element={<EditCard deck={deck} decks={decks} setDecks={setDeck}/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}


export default Card;