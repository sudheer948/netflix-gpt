import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <>
      <div className="-z-10 fixed">
        <img src={BG_URL} alt="background-logo" className="h-screen object-cover"/>
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GPTSearch;
