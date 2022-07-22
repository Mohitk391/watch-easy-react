import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Explore } from "./pages/explore/Explore";
import {HomePage} from "./pages/homepage/HomePage";
import { Playlist } from "./pages/playlist/Playlist";
import {WatchLater } from "./pages/watchlater/WatchLater";
import { Liked } from "./pages/liked/Liked";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={ <Explore /> } />
        <Route path="/watch/:id" element={ <Explore />} />
        <Route path="/profile" element={ <HomePage /> } />
        <Route path="/playlist" element={ <Playlist /> } />
        <Route path="/watchlater" element={ <WatchLater /> } />
        <Route path="/liked" element={ <Liked /> } />
        <Route path="/history" element={ <HomePage /> } />
      </Routes>
    </div>
  );
}

export default App;
