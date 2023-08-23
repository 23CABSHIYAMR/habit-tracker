import React, { useState } from "react";
import Content from "./Content";
import SocialMedia from "./SocialMedia";
import Profilecard from "./Profilecard";

function Profile() {
  const [show, setshow] = useState(false);
  return (
    <div
      className="overflow-hidden min-h-[95%] max-h-fit sm:h-[25%] tiny:h-[25%] md:h-[25%] sm:w-full
         md:w-full tiny:w-full lg:w-full lg:h-[25%] w-[25%]  shadow-card
      flex flex-col items-center rounded-card  justify-center bg-jetcolor p-3 xl:p-6 sticky top-[60px] sm:static lg:static md:static tiny:static"
    >
      <div className="sm:w-full tiny:w-full md:w-full lg:w-full w-[100%] h-[50%] flex items-center justify-center">
        <Profilecard show={show} setshow={setshow} />
      </div>
      <div
        className={`sm:w-full tiny:w-full md:w-full w-[100%] h-[50%] flex items-center justify-center ${
          !show
            ? "sm:hidden md:hidden tiny:hidden lg:hidden"
            : "sm:flex md:flex tiny:flex lg:flex scale-up-center"
        }`}
      >
        <div className={`w-full h-full`}>
          <div className="mt-8 w-full"></div>
          <ul className="grid grid-col-1 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 tiny:grid-cols-1 gap-8 sm:px-4 lg:px-4 md:px-4 tiny:px-4 px-4">
            <Content />
          </ul>

          <ul
            className="flex w-[95%] my-8 tiny:my-4 tiny:mt-6 justify-end lg:justify-end 
          sm:justify-end tiny:justify-end md:justify-end items-center gap-8"
          >
            <SocialMedia />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
