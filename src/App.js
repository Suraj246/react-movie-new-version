import './App.css';
import Movies from './components/Movies'
import MovieDetails from './components/MovieDetails'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="movie-container">

      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
