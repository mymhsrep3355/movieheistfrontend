import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const RecommendedMovies = () => {
    const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    // Fetch recommended movies from Flask backend
    axios.post('http://localhost:5000/recommend_movies', {
      user_movies: []
    })
    .then(response => {
      setRecommendedMovies(response.data.recommended_movies);
    })
    .catch(error => {
      console.error('Error fetching recommended movies:', error);
    });
  }, []);
  return (
    <div>
        <Link
        to="/"
        className="fixed z-10 text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full mt"
      >
        <HiChevronLeft />
      </Link>
      <h2 className=' mt-12'>Recommended Movies</h2>
      <ul>
        {recommendedMovies.map(movie => (
          <li key={movie}>{movie}</li>
        ))}
      </ul>
    </div>
  )
}

export default RecommendedMovies