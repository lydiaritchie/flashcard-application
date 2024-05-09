import React from "react";
import { Link } from "react-router-dom";

function ErrorMessage() {
    return (
        <div>
            <h4>There was an error.</h4>
            <Link to={"/"}>Return Home</Link>
        </div>
    )
}

export default ErrorMessage;