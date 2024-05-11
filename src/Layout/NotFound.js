import React from "react";
import { Link } from "react-router-dom";

//displayed when a URL isn't found
function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
}

export default NotFound;
