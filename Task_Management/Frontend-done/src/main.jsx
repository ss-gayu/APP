import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // ES6 Module (ESM)
// const App = require('./App.jsx') // Common JS Module (CJS)

const domRoot = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(domRoot);

reactRoot.render(
    <StrictMode>
        <App />
    </StrictMode>
);