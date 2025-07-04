import React from "react";
import { HiMiniChartBar } from "react-icons/hi2";
import { BsFillGrid3X2GapFill } from "react-icons/bs";

export default function DisplayType({
  grid = false,
  updateDisplayType,
  displayType = "bar",
}) {
  const activeIndex = displayType === "bar" ? 0 : 1;

  return (
    <div className=" relative w-fit h-full bg-[#ebf1fc] flex gap-5 items-center justify-between rounded-3xl p-2 overflow-hidden">
      {/* Moving capsule background */}
      <div
        className="absolute top-1 left-1 h-[80%] w-[45%] bg-white rounded-3xl z-0 transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${activeIndex * 115}%)`,
        }}
      ></div>

      {/* Bar Icon */}
      <HiMiniChartBar
        size={"1.5em"}
        onClick={() => updateDisplayType("bar")}
        className={`z-10 pt-0.3  cursor-pointer transition-colors duration-200 ${
          displayType === "bar" ? "text-black" : "text-[#a7adb8]"
        }`}
      />

      {/* Grid Icon */}
      {grid && (
        <BsFillGrid3X2GapFill
          size={"1.5em"}
          onClick={() => updateDisplayType("grid")}
          className={`z-10 pt-0.3 cursor-pointer transition-colors duration-200 ${
            displayType === "grid" ? "text-black" : "text-[#a7adb8]"
          }`}
        />
      )}
    </div>
  );
}
