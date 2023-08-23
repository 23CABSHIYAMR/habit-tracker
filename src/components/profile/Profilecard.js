import React from "react";
import * as IoIcon from "react-icons/io5";

function Profilecard(props) {
  const { show, setshow } = props;
  return (
    <>
      <div
        className="relative flex sm:flex-row md:flex-row tiny:flex-row 
        sm:justify-start tiny:justify-start md:justify-start
        sm:items-center tiny:items-center md:items-center h-full
        w-full flex-col
        lg:flex-row justify-start items-center gap-4"
      >
        <figure className="rounded-card bg-blackgr">
          <img
            src={require("../assets/images/my-avatar2.PNG")}
            alt="Rahul"
            className="w-[150px] h-[150px] sm:w-[120px] sm:h-[110px] tiny:w-[80px] tiny:h-[80px]  md:w-[120px] md:h-[110px]"
          />
        </figure>
        <div className="left-info-content flex flex-col justify-center items-center sm:justify-start tiny:justify-start">
          <h1
            className="text-white1 text-[26px] lg:text-h1 tiny:text-h4 sm:text-h4 md:text-h4 font-semibold leading[-0.25px] mb-2"
            title="Rahul"
          >
            Rahul
          </h1>

          <p className="text-white2 bg-bgcard text-tiny lg:text-base tiny:text-sm sm:text-sm md:text-sm font-light w-fit px-2 rounded-md py-[3px]">
            Full Stack developer
          </p>
        </div>
        <div className="absolute lg:flex md:flex sm:flex tiny:flex hidden right-0 top-0 sm:h-[110px] tiny:h-[80px] md:h-[110px] lg:h[110px] items-start justify-start ">
          <button
            className="bg-bgcard rounded-md px-2 w-full  py-1"
            onClick={() => {
              setshow(!show);
            }}
          >
            {show ? (
              <span className="text-sm lg:text-base text-text-active md:block lg:block hidden">
                Show Less
              </span>
            ) : (
              <span className="text-sm lg:text-base text-text-active md:block lg:block hidden">
                Show More
              </span>
            )}
            {show ? (
              <IoIcon.IoChevronUp
                name="calendar-outline"
                className="text-iconcolor tiny:block sm:block hidden"
              />
            ) : (
              <IoIcon.IoChevronDown
                name="calendar-outline"
                className="text-iconcolor tiny:block sm:block hidden"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Profilecard;
