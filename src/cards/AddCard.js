import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api";
import ErrorMessage from "../common/ErrorMessage";
import CardForm from "./CardForm";

function AddCard({deck}) {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");


    const navBar = (
        <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/" >Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>Deck</Link>
                    </li>
                    <li className="breadcrumb-item text-secondary">
                        {deck.name}
                    </li>
                </ol>
            </nav>
    )

    //handleChange for the input fields
    const handleChange = (event) => {
        if(event.target.placeholder.includes("Front")){
            setFront(event.target.value);
        } else {
            setBack(event.target.value);
        }
        
    }

    //handeSubmit() to add the card to the deck
    async function handleSubmit(event){
        event.preventDefault();
        //console.log("The form was submitted!");
        try{
            await createCard(deckId, {"front": front, "back": back});

            navigate(-1);
        } catch(error){
            return (<ErrorMessage />);
        }

    }

    return (
        <div>
          {navBar}
            <h2>Add Card</h2>
            <CardForm deckId={deckId} card={false}/>
        </div>
    )

}



export default AddCard;