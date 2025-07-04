import { useState, useEffect } from "react";
import { createHabit } from "../../services/habitData";
import { IoClose } from "react-icons/io5";
import { ColorPalette, dayNames, maxLength } from "../../constants/constants";

export default function AddHabit(props) {
  //save all the useState form elements in a single obj

  //habit name elements
  const [text, setText] = useState("");
  const handleTextChange = (event) => {
    if (event.target.value.length <= maxLength) {
      setText(event.target.value);
    }
  };
  //Habit type(radio btn) elements
  const [habitType, setHabitType] = useState("To-Do");
  const handleChange = (event) => {
    setHabitType(event.target.value);
  };
  useEffect(() => {}, [habitType]);

  //Weekly frequency elements
  const [selectedDays, setSelectedDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  function toggleSelected(index) {
    let copyArr = [...selectedDays];
    copyArr[index] = selectedDays[index] === false ? true : false;
    setSelectedDays(copyArr);
  }

  //choose color
  const [color, setColor] = useState(0);

  //collect all data and send it to createHabit fn()
  async function handleInput(e) {
    e.preventDefault();
    //edge-case
    if (text.trim() === "") {
      console.log("text cannot be empty");
      return;
    }
    //create new habit
    let habitObj = {
      habitName: text,
      habitType: habitType,
      weekFrequency: selectedDays,
      palette: ColorPalette[color],
      order: (props.length || 0) + 1,
    };
    try {
      await createHabit(habitObj);

      //reset all inputs
      setText("");
      let arr = [true, true, true, true, true, true, true];
      setSelectedDays(arr);
      setHabitType("To-Do");
    } catch (err) {
      console.error("Error while sending inputs:", err);
      props.toggle();
    }
    //render new habit
    props.setHabitDetails(habitObj);
    await props.refreshMonthData();
    //close slide-in panel
    props.toggle();
  }

  return (
    //grey bg
    <div
      className="w-[100vw] h-[100vh] fixed top-0 bg-black/40 flex justify-end z-999 transition:right duration-300 ease-in-out pointer-events-none"
      style={{ right: props.right }}
    >
      {/* container for popup to slide in */}
      {/* <div className="fixed top-0 left-1/2 w-2xl h-full rounded-4xl pointer-events-none border-1 border-black"> */}
      {/* slide in menu*/}
      <div
        className="absolute h-[100vh] md:w-25/100  bg-white   rounded-3xl translate-x-4/5 pointer-events-auto transition-transform duration-500 ease-in-out p-8 flex flex-col gap-5"
        style={{ transform: props.transform }}
      >
        <header className="flex justify-between items-center ">
          <div className=" border-l-6 border-[#00e3e2] rounded-sm py-3 px-3 ">
            <h1 className="mb-1 p-0 font-medium text-2xl">Add Habit</h1>
            <p className="text-[#adb5c3] text-sm">
              Tackle your goals in daily doses
            </p>
          </div>
          <button
            onClick={props.toggle}
            className="flex items-center text-[#595959] rounded-full bg-[#d8e2f1] h-10 w-10 p-2"
          >
            <IoClose size={200} />
          </button>
        </header>
        <form
          onSubmit={handleInput}
          className="flex flex-col gap-5"
          id="Habit-Data"
        >
          {/* 1.habit name */}
          <section>
            <div className="flex justify-between items-center my-2">
              <span className="text-lg">1. Name this habit</span>
              <span className=" text[#adb5c3] text-sm">Max 15 Characters</span>
            </div>
            <input
              className="w-full border-1 border-[#595959] p-1 h-10 rounded-md focus:border-[#009bff]"
              type="text"
              value={text}
              onChange={handleTextChange}
              maxLength={maxLength}
              placeholder="Habit name"
            />
            <span className="absolute right-10 mt-2 text-[#adb5c3]">
              {maxLength - text.length}
            </span>
          </section>

          {/* 2.Habit  Type */}
          <section>
            <p className="text-lg my-2">2. Habit Type</p>

            <div>
              <input
                type="radio"
                value="To-Do"
                onChange={handleChange}
                checked={habitType === "To-Do"}
              />
              &nbsp; To-Do &nbsp;&nbsp;
              <input
                type="radio"
                value="Not-To-Do"
                onChange={handleChange}
                checked={habitType === "Not-To-Do"}
              />
              &nbsp; Not-To-Do
            </div>
          </section>

          {/* 3.Weekly frequency */}
          <section>
            <p className="text-lg my-2">3.Weekly frequency</p>

            <div className="flex justify-between">
              {dayNames.map((weekDay, index) => (
                <button
                  type="button"
                  key={index}
                  className={`border-1 ${
                    selectedDays[index]
                      ? "bg-[#009bff] text-white"
                      : "border-[#d8e2f1]"
                  } text-sm p-1.5 rounded-sm text-center w-10`}
                  onClick={() => {
                    toggleSelected(index);
                  }}
                >
                  {weekDay}
                </button>
              ))}
            </div>
            <div className="w-full flex gap-1 my-1">
              <button
                type="button"
                className={`border-1 border-[#d8e2f1] text-sm p-1.5 rounded-sm text-center grow active:border-[#009bff]`}
                onClick={() => {
                  let arr = [false, true, true, true, true, true, false];
                  setSelectedDays(arr);
                }}
              >
                Weekdays
              </button>
              <button
                className={`border-1 border-[#d8e2f1] text-sm p-1.5 rounded-sm text-center grow active:border-[#009bff]`}
                type="button"
                onClick={() => {
                  let arr = [true, true, true, true, true, true, true];
                  setSelectedDays(arr);
                }}
              >
                Everyday
              </button>
            </div>
          </section>
          {/* 4.Palette */}
          <section>
            <p className="text-lg my-2">4. Palette</p>

            <div className="flex justify-between items-center">
              {ColorPalette.map((e, index) => (
                <button
                  type="button"
                  className={`rounded-full w-6 h-6 ${
                    color === index && "w-8 h-8"
                  }`}
                  key={index}
                  onClick={() => {
                    setColor(index);
                  }}
                  style={
                    color === index
                      ? {
                          background: e,
                          border: `5px solid ${e}`,
                          transition: "border 1ms ease-out",
                        }
                      : { background: e }
                  }
                ></button>
              ))}
            </div>
          </section>
          {/* submit all data */}
          <button
            type="submit"
            className="w-33 h-11 rounded-4xl bg-[#009bff] active:bg-[#007DFF]  text-white text-center  text-lg "
          >
            Add Habit
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
}
