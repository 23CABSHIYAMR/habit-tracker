import React from "react";

function EducationCard(props) {
  const { json } = props;
  return (
    <>
      {json.map((v) => (
        <li key={v.title} className="w-full ">
          <div className="flex flex-col justify-center items-start rounded-lg py-2 px-6 w-full relative cursor-pointer z-1 sm:px-0 md:px-0 tiny:px-0">
            <div
              className="flex flex-col justify-center items-start w-[80%] h-full  mb-2 px-4 
            after:content-[''] after:absolute after:top-4 after:left-4 after:bg-text-active after:w-[6px] after:h-[6px] after:rounded-full
            sm:px-4 md:px-4 tiny:px-4 sm:after:left-0 md:after:left-0 tiny:after:left-0 
            "
            >
              <h4 className="text-h6 sm:text-base md:text-base tiny:text-base  text-white1 font-semibold tracking-wider w-full ">
                {v.studied}
              </h4>
              <span className=" font-thin text-text-active text-base py-[2px] w-full ">
                {v.year}
              </span>
              <span className=" font-thin text-lightgray text-base py-[2px] w-full ">
                {v.title}
              </span>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default EducationCard;
