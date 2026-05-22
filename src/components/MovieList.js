import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {

  return (
    <div className="px-2 md:px-6">
      <h1 className="text-xl md:text-3xl py-4 text-white font-bold">{title}</h1>
      <div className="flex overflow-x-scroll scroll-smooth scrollbar-none">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
