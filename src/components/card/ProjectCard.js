import React from "react";

function ProjectCard(props) {
  return (
    <>
      {props.data.map((v) => (
        <div className="py-1 rounded-md ">
          <div className="rounded-md w-full h-full">
            <img
              src={v.img}
              className="w-[100%] h-[200px] rounded-md"
              alt="matirx"
            />
            <div className="py-2 w-full">
              <div className="text-h6 sm:text-base md:text-base tiny:text-base text-white1  tracking-wider w-full ">
                {v.title}
              </div>
              <div className="text-white2 text-h6 font-thin">{v.category}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProjectCard;
