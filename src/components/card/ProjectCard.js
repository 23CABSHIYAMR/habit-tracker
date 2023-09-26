/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../css/style.css";
function ProjectCard(props) {
  return (
    <>
      {props.data.map((v) => (
        <div className="py-1 rounded-md ">
          <div className="rounded-md w-full h-full flex flex-col items-center project-item ">
            <a href="#" className="w-full">
              <figure className="project-img actives block before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full z-1">
                <img
                  src={v.img}
                  className="w-[100%] sm:w-[80%] tiny:w-[80%] md:w-[80%] h-[200px] rounded-md "
                  alt="matirx"
                />
              </figure>
              <div className="py-2 w-full sm:w-[80%] tiny:w-[80%] md:w-[80%]">
                <div className="text-h6 sm:text-base md:text-base tiny:text-base text-white1  tracking-wider w-full ">
                  {v.title}
                </div>
                <div className="text-white2 text-h6 font-thin">
                  {v.category}
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProjectCard;
