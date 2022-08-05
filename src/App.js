import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Explore } from "./pages/explore/Explore";
import {HomePage} from "./pages/homepage/HomePage";
import { Playlist } from "./pages/playlist/Playlist";
import {WatchLater } from "./pages/watchlater/WatchLater";
import { Liked } from "./pages/liked/Liked";
import { History } from "./pages/history/History";
import { Login, Signup } from "./pages/authentication/index";
import { SingleVideo } from "./pages/singleVideoPage/SingleVideo";
import { SinglePlaylist } from "./pages/playlist/SinglePlaylist";
import { ToastContainer } from "react-toastify";
import { RequiresAuth } from "./utils/AuthCheck/RequiresAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={ <Explore /> } />
        <Route path="/watch/:id" element={ <SingleVideo />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route
          path="/playlist"
          element={ 
            <RequiresAuth>
              <Playlist /> 
            </RequiresAuth>
          } />
        <Route 
          path="/singlePlaylist/:id" 
          element={
            <RequiresAuth>
              <SinglePlaylist />
            </RequiresAuth>
          } />
        <Route 
          path="/watchlater" 
          element={ 
            <RequiresAuth>
              <WatchLater />
            </RequiresAuth>
          } />
        <Route 
          path="/liked" 
          element={ 
            <RequiresAuth>
              <Liked /> 
            </RequiresAuth>
          } />
        <Route 
          path="/history" 
          element={ 
          <RequiresAuth>
            <History />
          </RequiresAuth>
          } />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
