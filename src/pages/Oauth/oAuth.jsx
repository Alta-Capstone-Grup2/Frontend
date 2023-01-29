import React from "react";
import { FcGoogle } from "react-icons/fc";

const Oauth = () => {
  return (
    <button className="btn btn-ghost my-2 w-full border border-bozz-one text-gray-700 text-xs">
      <a
        target={"_self"}
        href="https://irisminty.my.id/login/oauth/google"
        className="flex"
      >
        <FcGoogle className="text-lg mr-3" /> Login with Google
      </a>
    </button>
  );
};

export default Oauth;
