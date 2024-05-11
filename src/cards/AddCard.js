import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard({deck}) {
    const { deckId } = useParams();

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

    return (
        <div>
          {navBar}
            <h2>Add Card</h2>
            <CardForm deckId={deckId} card={false}/>
        </div>
    )

}



export default AddCard;