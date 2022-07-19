import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { makeServer } from "./server";
import { VideoProvider, WatchLaterProvider, PlaylistProvider, LikeProvider} from "./contexts/index";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoProvider>
        <LikeProvider>
          <PlaylistProvider>
            <WatchLaterProvider>
              <App />
            </WatchLaterProvider>
          </PlaylistProvider>
        </LikeProvider>
      </VideoProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
