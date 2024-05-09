import React from "react";
import { readCard, updateCard, listDecks, readDeck } from "../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function EditCard({deck, decks, setDecks}) {
    const { cardId, deckId } = useParams();
    const [ front, setFront ] = useState("");
    const [ back, setBack ] = useState("");
    const [ card, setCard ] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getCard() {
            const card = await readCard(cardId);
            setFront(card.front);
            setBack(card.back);
            setCard(card);
        }
        getCard();
        
    }, []);

    console.log(card);

    const navBar = (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" >Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`} state={deck}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item text-secondary">
                        Edit Card
                    </li>
                </ol>
            </nav>
        </div>
    );

    //console.log("cardId: " + cardId);
    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if(name === "front"){
            setFront(value);
        } else {
            setBack(value);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        const updatedCard = {
            ...card,
            front: front,
            back: back,
        };

        try{
            await updateCard(updatedCard);
        } catch(error){
            console.log("error "+ error);
        }

        //console.log("before: "+JSON.stringify(result));

        //update the decks state to match the API
        const deckList = await listDecks();
        //const deck = await readDeck(deckId);
        setDecks(deckList);
        console.log("deck: "+ deck);
        navigate(-1);
    }

    return (

            <div>
            {navBar}
            <h1>Edit Card</h1>

            <form className="col" onSubmit={handleSubmit}>
                <label className="col" htmlFor="name">Name</label>
                <input 
                    className="col text-secondary" 
                    name="front"
                    type="text"
                    onChange={handleChange}
                    value={front}
                    required
                    />
                <label className="col" htmlFor="description">Description</label>
                <textarea 
                    className="col text-secondary"
                    name="back"
                    onChange= {handleChange}
                    value={back}
                    required
                    />

                <Link to={`/decks/${deckId}`} className="btn btn-danger">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

    
}


export default EditCard;