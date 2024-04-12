import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const MovieItems = ({ movie }) => {
  const { title, backdrop_path, poster_path, release_date } = movie;
  // console.log(title);
  // console.log(release_date);

  const [like, setLike] = useState(null);

  useEffect(() => {
    if (localStorage.getItem(movie.id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [movie.id]);

  const handleLike = async () => {
    const userToken = localStorage.getItem("token");
    // console.log(userToken);
    if (!userToken) {
      toast.error("Please login to like movies");
    }
    else{
      if (like) {
        localStorage.removeItem(movie.id);
        setLike(false);
      } else {
        localStorage.setItem(movie.id, JSON.stringify(movie));
        setLike(true);
        toast.success("Movie added to favorites");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      layout
      className="inline-block overflow-hidden cursor-pointer m-3 rounded-lg relative w-[150px] sm:w-[200px] md:w-[250px] lg:w-[280px]"
    >
      <button
        className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl"
        onClick={() => handleLike(movie.id)}
      >
        {" "}
        {like ? <AiFillStar /> : <AiOutlineStar />}
      </button>

      <div className="absolute bottom-0 w-full flex justify-between items-end p-3 z-20">
        <h1 className="text-white text-xl font-semibold  break-normal break-words">
          {movie.title || movie.name}
        </h1>

        {(movie.vote_average || 0) > 7 ? (
          <h1 className="font-bold text-green-500 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        ) : (movie.vote_average || 0) > 5.5 ? (
          <h1 className="font-bold text-orange-400 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        ) : (
          <h1 className="font-bold text-red-600 p-2 bg-zinc-900 rounded-full">
            {(movie.vote_average || 0).toFixed(1)}
          </h1>
        )}
      </div>

      <Link
        to={`/movie-details/${movie.id}`}
        className="h-full w-full shadow absolute z-10"
      ></Link>

      <div>
        {movie.poster_path === null ? (
          <img className="img object-cover" src="" />
        ) : (
          <LazyLoadImage
            className="img object-cover"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          />
        )}
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default MovieItems;
// try {
//   const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   const response = await axios.post(
//     "http://localhost:7676/api/auth/likes",
//     { likes: [movieId] },
//     { headers, withCredentials: true }
//   );

//   console.log(response.data); // Check the response from the backend

//   // Update local state or perform any necessary actions after liking a movie
// } catch (error) {
//   console.error("Error liking movie:", error.message);
//   // Handle error, e.g., display an error message to the user
// }
