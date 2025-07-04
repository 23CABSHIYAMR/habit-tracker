import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";

export default function HabitAddedMsg({ addedHabitDetails, setHabitDetails }) {
  const [fade, setFade] = useState(false);
  console.log(addedHabitDetails)
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 1500);
    const removeTimer = setTimeout(() => setHabitDetails({}), 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ease-out p-2 flex justify-center items-center text-center rounded shadow-md 
      ${fade ? "opacity-0" : "opacity-100"} bg-green-200 text-green-700`}
    >
      <div
        style={{ color: addedHabitDetails.palette }}
        className="flex justify-center"
      >
        {addedHabitDetails.habitType === "To-Do" ? (
          <FaCircle size={"18px"} className="m-1.5" />
        ) : (
          <RiCloseFill size={"25px"} className="m-1" />
        )}
      </div>
      {addedHabitDetails.habitName} has been added!
    </div>
  );
}
// let habitObj = {
//       habitName: text,
//       habitType: habitType,
//       weekFrequency: selectedDays,
//       palette: ColorPalette[color],
//       order: (props.length || 0) + 1,
//     };