import { Route, Routes } from "react-router-dom";
import "./App.css";
import {HomePage} from "./pages/homepage/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={ <HomePage /> } />
        <Route path="/profile" element={ <HomePage /> } />
        <Route path="/playlist" element={ <HomePage /> } />
        <Route path="/watchlater" element={ <HomePage /> } />
        <Route path="/liked" element={ <HomePage /> } />
        <Route path="/history" element={ <HomePage /> } />
      </Routes>
    </div>
  );
}

export default App;
