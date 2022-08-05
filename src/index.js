import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { makeServer } from "./server";
import { VideoProvider, WatchLaterProvider, PlaylistProvider, LikeProvider, UserProvider, HistoryProvider} from "./contexts/index";
import { FilterProvider } from "./contexts/FilterContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FilterProvider>
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
        </FilterProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
