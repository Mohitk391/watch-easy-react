import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Explore } from "./pages/explore/Explore";
import {HomePage} from "./pages/homepage/HomePage";
import {WatchLater } from "./pages/watchlater/WatchLater";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={ <Explore /> } />
        <Route path="/watch/:id" element={ <Explore />} />
        <Route path="/profile" element={ <HomePage /> } />
        <Route path="/playlist" element={ <HomePage /> } />
        <Route path="/watchlater" element={ <WatchLater /> } />
        <Route path="/liked" element={ <HomePage /> } />
        <Route path="/history" element={ <HomePage /> } />
      </Routes>
    </div>
  );
}

export default App;
