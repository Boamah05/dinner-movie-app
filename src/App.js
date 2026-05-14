import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";

const getMovie = async () => {
  const API_KEY = "8c23b98e";

  const searchTerms = ["action", "comedy", "drama", "romance"];

  const randomTerm =
    searchTerms[Math.floor(Math.random() * searchTerms.length)];

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${randomTerm}`
  );

  const data = await res.json();

  if (!data.Search) return null;

  return data.Search[Math.floor(Math.random() * data.Search.length)];
};

const getTrailerEmbed = (movieTitle) => {
  const query = encodeURIComponent(`${movieTitle} official trailer`);
  return `https://www.youtube.com/embed?listType=search&list=${query}`;
};

const restaurantData = [
  { name: "Chick-fil-A", location: "Round Rock, TX", cuisine: "Fast Food" },
  { name: "Whataburger", location: "Austin, TX", cuisine: "Burgers" },
  { name: "Chipotle", location: "Round Rock, TX", cuisine: "Mexican" },
  { name: "In-N-Out Burger", location: "Austin, TX", cuisine: "Burgers" },
  { name: "P. Terry’s", location: "Austin, TX", cuisine: "American" },
  { name: "Torchy’s Tacos", location: "Round Rock, TX", cuisine: "Tacos" },
];

const getRestaurant = () =>
  restaurantData[Math.floor(Math.random() * restaurantData.length)];

function App() {
  const [movie, setMovie] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const loadMatch = async () => {
    const m = await getMovie();
    const r = getRestaurant();

    setMovie(m);
    setRestaurant(r);
    setShowMatch(false);
    setShowTrailer(false);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleLike = () => {
    triggerConfetti();

    setSelectedMatch({
      movie,
      restaurant,
      trailer: getTrailerEmbed(movie.Title)
    });

    setShowMatch(true);
  };

  const handleNope = () => {
    loadMatch();
  };

  return (
    <div className="container">
      <h1>Dinner & a Movie</h1>

      {!movie && !restaurant && (
        <button className="btn" onClick={loadMatch}>
          Start Swiping
        </button>
      )}

      {movie && restaurant && !showMatch && (
        <div className="tinder-card">
          <h2>{movie.Title}</h2>

          {movie.Poster !== "N/A" && (
            <img src={movie.Poster} alt={movie.Title} />
          )}

          <p>{movie.Year}</p>

          <hr />

          <h3>{restaurant.name}</h3>
          <p>{restaurant.location}</p>
          <p>{restaurant.cuisine}</p>
        </div>
      )}

      {movie && restaurant && !showMatch && (
        <div className="buttons">
          <button className="nope" onClick={handleNope}>
            Nope
          </button>

          <button className="like" onClick={handleLike}>
            Like
          </button>
        </div>
      )}

      {showMatch && selectedMatch && (
        <div className="match-card">
          <h2>It's a Match</h2>

          <button
            className="trailer-btn"
            onClick={() => setShowTrailer(true)}
          >
            Watch Trailer
          </button>

          <div className="card">
            <h3>{selectedMatch.movie.Title}</h3>

            {selectedMatch.movie.Poster !== "N/A" && (
              <img
                src={selectedMatch.movie.Poster}
                alt={selectedMatch.movie.Title}
              />
            )}

            <p>{selectedMatch.movie.Year}</p>

            <hr />

            <h3>{selectedMatch.restaurant.name}</h3>
            <p>{selectedMatch.restaurant.location}</p>
            <p>{selectedMatch.restaurant.cuisine}</p>
          </div>

          <button className="btn" onClick={loadMatch}>
            Find Another Night
          </button>
        </div>
      )}

      {showTrailer && selectedMatch && (
        <div className="modal-overlay" onClick={() => setShowTrailer(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowTrailer(false)}
            >
              X
            </button>

            <iframe
              src={selectedMatch.trailer}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;