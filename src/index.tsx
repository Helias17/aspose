import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./styles/page.css";
import App from "./components/App";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container);

root.render(<App />);
