import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const fetchTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_OPTIONS,
    );
    const json = await data.json();
    console.log(json.results);

    dispatch(addTopRatedMovies(json.results));
  };
  useEffect(() => {
   !topRatedMovies && fetchTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
