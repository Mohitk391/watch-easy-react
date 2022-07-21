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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={ <Explore /> } />
        <Route path="/watch/:id" element={ <SingleVideo />} />
        <Route path="/profile" element={ <HomePage /> } />
        <Route path="/playlist" element={ <Playlist /> } />
        <Route path="/singlePlaylist/:id" element={<Playlist />} />
        <Route path="/watchlater" element={ <WatchLater /> } />
        <Route path="/liked" element={ <Liked /> } />
        <Route path="/history" element={ <History /> } />
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
      </Routes>
    </div>
  );
}

export default App;
