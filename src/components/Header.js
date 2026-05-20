import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubsribe when component unmounts

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen bg-gradient-to-b from-black/80 p-2 z-10 flex flex-col md:flex-row justify-between items-center">
      <img
        className="h-20  object-cover cursor-pointer"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex gap-2.5 p-5">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-500 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="p-2 px-4 mx-4 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-12 h-12 rounded-lg"
            src={
              user?.photoURL ||
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAArlBMVEX/AAz/////AAD8////AAX8AAD8//3///3///v+z8T++PX8+/X849n9Rjz96eP9FwD8YE/7hHD9u6r5y7n9ppb5VDf8d2X8tKT7sZ77aVP+HRb63s78kIb8+O377N39hnj4nov81Mr7fWj4w7D4pY78mIz8bmf8vrX+OCz87ev9MB/+WVH+Xl78rJ3+cm/839r8UUH7MQv6kH720br7ZVj+QzP8W0b7bl/5mHz7QB4ApgPDAAADI0lEQVR4nO2abVfiMBCFzaRtWlraQlGUWl6EVaiLKAqs//+PbaAoLa7YYKq7Z+/zlZPLzUwy5MxwcgIAAAAAAAAAAAAAAAAAAAAAAP83Bm2oQPloYYOCRjOKWqfabZF51o6i8wt1Yeq0bLYhDrW6MszLJBPu9hSFyYx5ttS23IZGV0bQtNgW3jeVlnYGXGQrhRDWlT5XNOS2eHU1UhGmH2yHsPyOocvTtZVTZm69vCuDXCF2pmze1xQqmQEmcttlN+WFKeQivyE20GSK6oldUPbGpZWpxQue2CTVkz+6Y3lT3LJuy5tq75tSyP1B4R7Lp49Z/Gd5U9M3kdJk6q6oy7lCpBp7pjylgnJA+NbNywqWlE+BQby49lzX7UtnBWHLUdgt3RRSr1JOPhDu83yxsc4UhGkxsexd5qfaKroReK8VXdgsUjoWdL9LPh+SroK+rlTeSxIEdxTvD4Ux4+vjxJO+Rk9SeOysdaUxqxmoZoBoFfm+PxulWj2tHyDh0JPCzdNjhImC5wezgqcnkfnwCWFDb5C+QBgAAAAAAAAAAPjXMCqaRn0GSuePzacKXG0mZMd0BWSUGjPOuHuh3RWFw65zp944NmSUupwLJrg/1tzpoIUvNyviK1MlWjJI5sjjmya/sBX66CVN3fCsF97tjcseWaJgNbR3vWeFPnopjNR7meBwf5R+fJXW123cn+0avHJ1FGj1JHFyfW0rulwc8iU/66z6cXFokExN3c0zWiaFkcZkME/J3LuR2XTcpLQxnLm8ODNw6prbqZmrQe5bNlFLolbv6T4NMm/STWe8vJ5PBwX7my3YzrKa2kkn8y7L714IzqzaxPdiZ8NjPJvUamLfEWNuFJpVlXODzHmcS4qwhf3WQWGkIosT85pptb8w8vw6fwjF+7iDq9IV5GjkUb7vx3aWvfecbD/hiXP4kmqEKK2PvJr1nqXMl9sdrhbBF74M1jd/MW+/vWXblCWD9nz5HW+VdX0cLxtTJ/bllcuYTLqPzV+r+jioYp5Sju0ficyHxXIZhuHp82vB+iZDebbm/govAAAAAAAAAAAAAACAKvgNZbwrK/M2F8wAAAAASUVORK5CYII="
            }
            alt="profile"
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white bg-red-700 rounded-lg px-2 hover:bg-red-800 transition h-12"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
