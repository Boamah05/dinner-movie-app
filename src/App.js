import "./App.css";
import { useState } from "react";

const getMovie = async () => {
  const API_KEY = "8c23b98e";

  const searchTerms = [
    "action",
    "comedy",
    "drama",
    "romance",
  ];

  const randomTerm =
    searchTerms[Math.floor(Math.random() * searchTerms.length)];

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${randomTerm}`
    );

    const data = await res.json();

    if (!data.Search) {
      console.error("Movie error:", data);
      return null;
    }

    return data.Search[
      Math.floor(Math.random() * data.Search.length)
    ];
  } catch (err) {
    console.error("Movie fetch error:", err);
    return null;
  }
};

const restaurantData = [
  {
    id: 1,
    name: "Chick-fil-A",
    location: "Round Rock, TX",
    cuisine: "Fast Food",
  },
  {
    id: 2,
    name: "Whataburger",
    location: "Austin, TX",
    cuisine: "Burgers",
  },
  {
    id: 3,
    name: "Chipotle",
    location: "Round Rock, TX",
    cuisine: "Mexican",
  },
  {
    id: 4,
    name: "In-N-Out Burger",
    location: "Austin, TX",
    cuisine: "Burgers",
  },
  {
    id: 5,
    name: "P. Terry’s",
    location: "Austin, TX",
    cuisine: "American",
  },
  {
    id: 6,
    name: "Torchy’s Tacos",
    location: "Round Rock, TX",
    cuisine: "Tacos",
  },
];

const getRestaurant = () => {
  return restaurantData[
    Math.floor(Math.random() * restaurantData.length)
  ];
};

function App() {
  const [movie, setMovie] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMatch = async () => {
    setLoading(true);

    const m = await getMovie();

    const r = getRestaurant();

    setMovie(m);
    setRestaurant(r);

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Dinner & a Movie 🍿</h1>

      <button className="btn" onClick={getMatch}>
        Find My Night
      </button>

      {loading && (
        <p className="loading">
          Finding your perfect combo...
        </p>
      )}

      {movie && movie.Title && (
        <div className="card">
          <h2>🎬 {movie.Title}</h2>

          {movie.Poster !== "N/A" && (
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
          )}

          <p>{movie.Year}</p>
        </div>
      )}

      {restaurant && (
        <div className="card">
          <h2>🍔 {restaurant.name}</h2>

          <p>{restaurant.location}</p>

          <p>
            <strong>Cuisine:</strong>{" "}
            {restaurant.cuisine}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;