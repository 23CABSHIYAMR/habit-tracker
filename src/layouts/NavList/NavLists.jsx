import React from "react";
import { NavLink,useLocation } from "react-router-dom";
export default function NavLists() {
  const navItems = ["Week", "Month", "Year", "All-Time"];
  const location = useLocation();
   const getCurrentIndex = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("month")) return 1;
    if (path.includes("year")) return 2;
    if (path.includes("all-time")) return 3;
    return 0; // Default to "Week"
  };
  const activeIndex=getCurrentIndex();

  return (
    <nav className="relative w-[70%] p-2 bg-[#ebf1fc]  rounded-4xl grid grid-cols-4 text-center overflow-hidden">
      {/* Moving White Background Pill */}
      <div
        className="absolute top-2 left-2 h-[calc(100%-1rem)] w-10/41 bg-white rounded-3xl transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      ></div>

      {navItems.map((page, i) => (
        <NavLink
          to={page === "Week" ? "/" : `/${page.toLowerCase()}`}
          key={i}
          className={`relative z-10 text-md p-3 transition-all rounded-4xl ${
            activeIndex === i ? "text-black " : "text-[#a7adb8]"
          }`}
        >
          {page}
        </NavLink>
      ))}
    </nav>
  );
}
