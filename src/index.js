import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { makeServer } from "./server";
import { VideoProvider, WatchLaterProvider, PlaylistProvider, LikeProvider, UserProvider, HistoryProvider} from "./contexts/index";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <VideoProvider>
          <HistoryProvider>
            <LikeProvider>
              <PlaylistProvider>
                <WatchLaterProvider>
                  <App />
                </WatchLaterProvider>
              </PlaylistProvider>
            </LikeProvider>
          </HistoryProvider>
        </VideoProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
