import React from "react";
import { FaCircle } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
export default function HabitName({ logData }) {
  console.log("habitName=>",logData)
  return (
    <div className="w-full col-span-2 grid content-between  items-center gap-9 ">
      {/* habitName(first 2 cols) */}
      {Array.isArray(logData) &&
        logData.length > 0 &&
        logData
        .sort((a,b)=>a.habitId.order-b.habitId.order)
        .map((eachHabit, i) => {
          const habit = eachHabit?.habitId;
          if (!habit) {console.log("missing habit log for:",eachHabit);return null};
          return (
            <div key={i} className="flex gap-4 items-center">
              {eachHabit.habitId.habitType === "To-Do" ? (
                <FaCircle
                  color={eachHabit.habitId.palette}
                  size={"18px"}
                  className=" m-1.5"
                />
              ) : (
                <RiCloseFill
                  color={eachHabit.habitId.palette}
                  size={"25px"}
                  className="m-1"
                />
              )}
              <span className="w-full h-full text-md font-light">
                {eachHabit.habitId.habitName}
              </span>
            </div>
          );
        })}
    </div>
  );
}
