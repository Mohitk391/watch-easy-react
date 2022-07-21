import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { makeServer } from "./server";
import { VideoProvider, WatchLaterProvider } from "./contexts/index";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoProvider>
        <WatchLaterProvider>
          <App />
        </WatchLaterProvider>
      </VideoProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
