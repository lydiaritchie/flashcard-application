import React from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Study from "./Study";
import EditDeck from "./EditDeck";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import Card from "../cards/Card";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";



function DeckIdRoutes({decks, setDecks}) {
    const { deckId } = useParams();
    const navigate = useNavigate();

    console.log(deckId);
    const [ deck, setDeck ] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchDeck() {
            try{
                const fetchedDeck = await readDeck(deckId);
                setDeck(fetchedDeck);
            } catch(error) {
                if(error.name ===  `AbortError`) {
                    console.log(`Fetch aborted`);
                } else {
                    console.log(`Error fetching data`);
                }
            }
        }

        if(deckId) {
            fetchDeck();
        }

  
        return () => {
            abortController.abort();
        }

    }, [deckId]);


    return (
        <Routes>
            <Route path="" element={<Deck decks={decks} setDecks={setDecks} deck={deck} setDeck={setDeck} />}/>
            <Route path="study" element={<Study decks={decks} />}/> 
            <Route path="edit" element={<EditDeck decks={decks} setDecks={setDecks}/>}/> 
            <Route path="cards/*" element={<Card decks={decks} setDecks={setDecks}/>}/> 
            <Route path="*" element={<NotFound/>}/> 
        </Routes>
    )


}



export default DeckIdRoutes;