import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-violet-500 to-fuchsia-500 flex flex-col items-center py-16">
      <h1 className="text-[150px] text-bozz-six font-bold drop-shadow-[5px_8px_8px_#352360] animate-bounce">
        4<span className="animate-ping">0</span>4
      </h1>
      <p className="text-3xl text-bozz-six font-bold">
        Opps.. The page you are looking for doesn't exist
      </p>
      <Link
        to="/"
        className="btn border-none h-12 w-36 bg-bozz-three text-bozz-six text-semibold rounded-lg mt-5 border ring-2 ring-bozz-two hover:bg-bozz-three hover:ring-pink-500 hover:scale-110"
      >
        <span>Go back Home</span>
      </Link>
    </div>
  );
};

export default PageNotFound;
