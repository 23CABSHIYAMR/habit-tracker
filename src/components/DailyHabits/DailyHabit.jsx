import React, { useCallback } from "react";
import { ImFire } from "react-icons/im";
import { SlOptionsVertical } from "react-icons/sl";
import { FaCircle } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { dayNames } from "../../constants/constants";
import { useState, useEffect } from "react";

export default function DailyHabit({ habits = [], updateNewStatus, dayIndex,handleDeleteHabit }) {
  const [deleteBtn, setDeleteBtn] = useState(false);

  console.log()
  useEffect(() => {
    console.log(habits.habitId.habitName, deleteBtn);
  }, [deleteBtn]);
  const inActive =
    !habits.habitId?.weekFrequency[new Date(habits.date).getDay()];
  const toggleStatus = useCallback(() => {
    const oldStatus = habits.status;
    updateNewStatus(
      habits,
      oldStatus,
      habits.status === "completed" ? "pending" : "completed"
    );
  }, [habits.status, updateNewStatus]);





  const To_Do = habits.habitId.habitType === "To-Do";

  return (
    <div
      className="flex text-md p-2"
      style={inActive ? { color: "#a0aec0" } : {}}
    >
      {/* circle or cross */}
      <div
        className="h-full w-fit grid items-center"
        style={{ color: inActive ? "#a0aec0" : habits.habitId.palette }}
      >
        {To_Do ? (
          <FaCircle size={"18px"} className="m-1.5" />
        ) : (
          <RiCloseFill size={"25px"} className="m-1" />
        )}
      </div>

      {/* line based on habit status */}
      {habits.status === "pending" && (
        <div
          style={{
            height: "100%",
            border: `3px solid ${
              inActive ? "#a0aec0" : habits.habitId.palette
            }`,
            borderRadius: "1rem",
          }}
        ></div>
      )}

      {/* animated background container */}
      <div className="relative w-full rounded-2xl overflow-hidden">
        {/* animated filler */}
        <div
          className="absolute top-0 left-0 h-full z-0 transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: habits.habitId.palette,
            width: habits.status === "completed" ? "100%" : "0%",
          }}
        ></div>

        {/* main container */}
        <div
          className="relative z-10 px-3 py-1 grid grid-rows-2 gap-3 transition-colors duration-300"
          style={{
            color: habits.status === "completed" ? "white" : "black",
          }}
        >
          {/* first row: name, options, streaks */}
          <div
            className="grid grid-cols-3 "
            style={{ color: inActive ? "gray" : "inherit" }}
          >
            <h1 className="col-span-2 text-2xl font-light">
              {habits.habitId.habitName}
            </h1>
            <div className="col-span-1 flex justify-end items-center">
              {habits.streak > 0 ? (
                <>
                  {habits.streak}
                  <ImFire />
                </>
              ) : (
                <></>
              )}
              <div className="relative pointer-events-auto">
                <div onClick={() => setDeleteBtn((prev) => !prev)}>
                  {deleteBtn ? (
                    <RiCloseFill />
                  ) : (
                    <SlOptionsVertical size={"0.8em"} />
                  )}
                </div>

                <button
                  className="border border-gray-300  bg-white  absolute top-3 right-1 transi"
                  style={deleteBtn ? {opacity:'100%'} : { opacity: "0",pointerEvents:'none' }}
                  onClick={()=>handleDeleteHabit(habits)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* complete/undo/inactive */}
          <div>
            {habits.status === "completed" ? (
              <div className="flex justify-between py-1.5 mr-2">
                <div className="w-full flex items-center font-light text-lg">
                  <FaCheck size={"1.2em"} />
                  &nbsp;
                  {To_Do ? " Completed" : " Avoided"}
                </div>
                <button
                  type="button"
                  className="w-fit font-medium text-lg"
                  onClick={toggleStatus}
                >
                  Undo
                </button>
              </div>
            ) : inActive ? (
              <div className="p-1.5 w-full text-gray-500 text-lg">
                Inactive on {dayNames[dayIndex]}
              </div>
            ) : (
              <button
                className="w-full border-1 border-[#a7adb8]  text-[#009bff] font-bold p-1.5 rounded-sm "
                type="button"
                onClick={toggleStatus}
              >
                {To_Do ? "Mark Complete" : "Mark Avoided"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
