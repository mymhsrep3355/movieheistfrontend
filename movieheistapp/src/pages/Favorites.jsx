import React, { useContext, useEffect, useState } from "react";
import  Context  from "../state/Context.js";
import  MovieItems from "../components/Movies/MovieItems";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import TVitems from "../components/TV/TVitems.jsx";
import Share from "../components/Share.jsx";


const Favorites = () => {
  const { getUserLiked } = useContext(Context);
  const [localStorageMovies, setLocalStorageMovies] = useState([]);
    useEffect(() => {
        getUserLiked();
        const data = localStorage;
        setLocalStorageMovies(data);
    }, []);
  return (
    <div className="w-full bg-[#000000] md:p-10 mb-20 md:mb-0">
      <Link
        to="/movies"
        className="fixed z-3 text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full"
      >
        <HiChevronLeft />
      </Link>
      <h1 className="text-center font-bold mr-auto text-white text-2xl mb-6 ">
        Favorite Movies
      </h1>
      <Share movies={Object.values(localStorageMovies)} />
      <motion.div
        layout
        className="w-full md:p-2 flex flex-wrap relative md:justify-around justify-evenly mt-14"
      >
        <AnimatePresence>
            {Object.keys(localStorageMovies).filter((key) => !isNaN(key))
              .length == 0 ? (
              <p className="text-xl text-white">No Favorites Yet!</p>
            ) : (
              Object.keys(localStorageMovies)
                .filter((key) => !isNaN(key))
                .map((key, index) => (
                  <MovieItems
                    movie={{ ...JSON.parse(localStorageMovies[key]) }}
                  />                  
                ))
            )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default Favorites;

// import React, { useContext, useEffect, useState } from "react";
// import Context from "../Context.js";
// import MovieItems from "../components/Movies/MovieItems";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import { HiChevronLeft } from "react-icons/hi";
// import { Axios } from "axios";

// const Favorites = () => {
//   const { getUserLiked } = useContext(Context);
//   // const [localStorageMovies, setLocalStorageMovies] = useState([]);
//   const [localStorageData, setLocalStorageData] = useState([]);

//   useEffect(() => {
//     getUserLiked();

//     const data = { ...localStorage };
//     setLocalStorageData(data);
//     console.log(data);
//   }, []);

//   return (
//     <div className="w-full bg-[#000000] md:p-10 mb-20 md:mb-0">
//       <Link
//         to="/movies"
//         className="fixed z-3 text-4xl text-white bg-red-600 m-3 md:m-5 rounded-full"
//       >
//         <HiChevronLeft />
//       </Link>
//       <motion.div
//         layout
//         className="w-full md:p-2 flex flex-wrap relative md:justify-around justify-evenly mt-14"
//       >
//         <AnimatePresence>
//           <>
//             {Object.keys(localStorageData).filter((key) => !isNaN(key))
//               .length == 0 ? (
//               <p className="text-xl text-white">No Bookmark Yet!</p>
//             ) : (
//               Object.keys(localStorageData)
//                 .filter((key) => !isNaN(key))
//                 .map((key, index) => (
//                   <MovieItems
//                     key={index}
//                     movie={{ ...JSON.parse(localStorageData[key]) }}
//                   />
//                 ))
//             )}
//           </>
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default Favorites;

{/* <h6 className="text-center text-xl text-white from-zinc-200">Favorite TV Shows</h6>
<motion.div
  layout
  className="w-full md:p-2 flex flex-wrap relative md:justify-around justify-evenly mt-14"
>
  <AnimatePresence>
      {Object.keys(localStorageMovies).filter((key) => !isNaN(key))
        .length == 0 ? (
        <p className="text-xl text-white">No Favorites Yet!</p>
      ) : (
        Object.keys(localStorageMovies)
          .filter((key) => !isNaN(key))
          .map((key, index) => (
            <TVitems
              key={index?.id}
              show={{ ...JSON.parse(localStorageMovies[key]) }}
            />
          ))
      )}
  </AnimatePresence>
</motion.div> */}