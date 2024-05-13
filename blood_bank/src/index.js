// index.jsx
import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./authcomponent/LoginPage";

 // Import the LoginPage component

ReactDOM.render(
  <React.StrictMode>
    <LoginPage/> {/* Render the LoginPage component */}
  </React.StrictMode>,
  document.getElementById("root")
);
