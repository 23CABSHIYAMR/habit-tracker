import React from "react";
import { NavLink } from "react-router-dom";
import "../css/style.css";
function Nav() {
  const json = [
    {
      to: "/",
      link: "About",
    },
    {
      to: "/resume",
      link: "Resume",
    },
    {
      to: "/projects",
      link: "Projects",
    },
    {
      to: "/contact",
      link: "Contact",
    },
  ];
  return (
    <nav
      className="w-full flex justify-end items-center xl:absolute z-50 2xl:absolute 3xl:absolute
       xl:top-0 2xl:top-0 3xl:top-0  xl:right-0 2xl:right-0 3xl:right-0 lg:bottom-0 md:bottom-0 sm:bottom-0 tiny:bottom-0 fixed "
    >
      <ul
        className="xl:w-1/2 2xl:w-1/2 bg-blackgr xl:rounded-b-card 2xl:rounded-b-card flex  w-full 
        sm:justify-around md:justify-around tiny:justify-around
         xl:justify-around 2xl:justify-around 3xl:justify-around 
        3xl:w-1/2 3xl:rounded-b-card
        items-center h-[60px] sm:h-[50px] tiny:h-[50px]
         lg:rounded-t-card lg:justify-around md:rounded-t-card sm:rounded-t-card tiny:rounded-t-card"
      >
        {json.map((v) => (
          <li
            key={v.link}
            className="cursor-pointer w-[25%] h-full  flex items-center   text-center text-h5 sm:text-base
             tiny:text-base md:text-base lg:text-base text-white1 "
          >
            <NavLink
              activeclassname="active"
              to={v.to}
              className=" hover:text-text-active w-full tracking-wide hover-underline-animation"
            >
              {v.link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
