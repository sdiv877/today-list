import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/App.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <div className="App">
        Hello from React!
    </div>
);
