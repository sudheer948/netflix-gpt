import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );

    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value;
    console.log(query);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest 5 " +
      query +
      " movies only comma separated and don't reply as your job is mainly to give 5 movie names to the user query";

    try {
      const gptResults = await openai.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: gptQuery,
          },
        ],
      });

      console.log(gptResults);
      console.log(gptResults.choices[0].message.content);

      // movie1, movie2, movie3, movie4, movie5 converted this into array using split method
      const gptMovies = gptResults.choices[0].message.content.split(",");
      console.log(gptMovies);

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-[40%] md:p-0 md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
