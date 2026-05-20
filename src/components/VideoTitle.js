const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] p-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="bg-white text-black px-3 py-1 md:px-12 md:py-4 text-xl rounded-lg hover:bg-opacity-80">
          ▶️Play
        </button>
        <button className="hidden md:inline-block bg-gray-400 text-white px-12 mx-2 py-4 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

