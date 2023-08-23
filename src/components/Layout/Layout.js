import React from "react";
import "../css/style.css";
import "../css/animations.css";
import Nav from "../Nav/Nav";
import Profile from "../profile/Profile";

function Layout(props) {
  return (
    <div
      className="w-[90%] relative flex items-start justify-between sm:flex-col md:flex-col tiny:flex-col lg:flex-col h-[90%] 
     sm:my-8 tiny:my-8 my-14 "
    >
      <Profile />
      <div
        className="min-h-[95%] overflow-auto sm:w-full md:w-full tiny:w-full lg:w-full w-[70%] 
      flex flex-col items-center rounded-card  justify-center bg-jetcolor
       p-3 xl:p-4 relative tiny:my-4 lg:my-4 sm:my-4 md:my-4 shadow-card"
      >
        <Nav />
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
