import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";

//utils & constants
import { changeDate } from "../../utils/dateUtils";
import { IsoDate, WMDFormat } from "../../utils/dateFormat";
import LogFetcher from "../../utils/fetchingLog";
import { today } from "../../constants/constants";
//icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiPlusMedical } from "react-icons/bi";
//layouts & components
import Header from "../Header/Header";
import NavLists from "../NavList/NavLists";
import AddHabit from "../SlideInMenu/AddHabit";
import DailyHabit from "../../components/DailyHabits/DailyHabit";
import HabitAddedMsg from "../../components/HabitAddedMsg/HabitAddedMsg";

import { Outlet } from "react-router-dom";
import { deleteHabit } from "../../services/habitData";
import { getLogForDate } from "../../services/habitLog";
export default function AppLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date(today));
  const isTodayOrFuture = useMemo(() => {
    return IsoDate(selectedDate) >= IsoDate(today);
  }, [selectedDate]);

  const [newHabitAdded, setnewHabitAdded] = useState(false);

  const [statusUpdated, setStatusUpdated] = useState(IsoDate(today));
  const triggerFetch = () => {
    setnewHabitAdded((prev) => !prev);
  };
  const [slideInMenu, setSlideInMenu] = useState(false);
  const toggleMenu = () => setSlideInMenu((prev) => !prev);

  const logFetcherRef = useRef(new LogFetcher());

  useEffect(() => {
    const dateStr = selectedDate.toISOString().slice(0, 7);
    if (!logFetcherRef.current.prefetchedMonths.has(dateStr)) {
      logFetcherRef.current.prefetchMonthSurroundings(selectedDate);
    }
  }, [selectedDate]);

  const [logData, setLogData] = useState([]);
  useEffect(() => {
    const fetchLogs = async () => {
      const data = await logFetcherRef.current.getLogsByDate(selectedDate);
      setLogData(data);
    };
    fetchLogs();
  }, [selectedDate]);
  useEffect(() => {
    const updateIfNeeded = async () => {
      if (IsoDate(selectedDate) === IsoDate(statusUpdated)) {
        const data = await logFetcherRef.current.getLogsByDate(selectedDate);
        setLogData(data);
      }
    };
    updateIfNeeded();
  }, [statusUpdated, selectedDate]);
  useEffect(() => {
    logFetcherRef.current.resetAllData();
    (async () => {
      await logFetcherRef.current.prefetchMonthSurroundings(selectedDate);
      const newData = await getLogForDate(selectedDate);
      setLogData(newData);
    })();
  }, [newHabitAdded]);

  const updateNewStatus = useCallback(
    async (habit, oldStatus, status) => {
      if (!habit || !habit.habitId || !habit.date) {
        console.log("failed to update habit status");
        return;
      }

      const updatedLog = await logFetcherRef.current.updateDayLog(
        habit.habitId._id,
        habit.date,
        oldStatus,
        status,
        habit.streak
      );
      console.log("Db response=>", updatedLog);

      if (habit.date === IsoDate(selectedDate)) {
        const newData = await logFetcherRef.current.getLogsByDate(selectedDate);
        setLogData(newData);
      }
    },
    [selectedDate]
  );
  const [addedHabitDetails, setHabitDetails] = useState({});

  const handleStatusUpdate = useCallback(
    async (habits, oldStatus, newStatus) => {
      await updateNewStatus(habits, oldStatus, newStatus);
      setStatusUpdated(`${IsoDate(habits.date)}-${Date.now()}`);
    },
    [updateNewStatus]
  );

  const handleDeleteHabit = useCallback(async (habits) => {
    await deleteHabit(habits.habitId._id);
    logFetcherRef.current.resetAllData();

    await logFetcherRef.current.prefetchMonthSurroundings(selectedDate);
    const newData = await logFetcherRef.current.getLogsByDate(selectedDate);
    setLogData(newData);
  }, []);

  return (
    <div className="w-full h-[100vh] bg-white ">
      {Object.keys(addedHabitDetails).length > 0 && (
        <section className="w-full h-fit m-0 bg-green-300 text-center text-white">
          <HabitAddedMsg
            addedHabitDetails={addedHabitDetails}
            setHabitDetails={setHabitDetails}
          />
        </section>
      )}
      <div className="w-full grid grid-cols-7 py-8 px-10 gap-2 sm:gap-4">
        <div className="w-full text-left md:col-span-5 col-span-7 space-y-1.5 px-2">
          <Header />

          {/* NavList and Add Habit Section*/}
          <section className="w-full h-fit flex justify-between items-center my-4">
            {/* nav section */}
            <NavLists />
            <>
              <button
                className="w-[22%] text-[1.2em] p-4  flex justify-center items-center border-1 border-[#AFABAB]  text-[#009bff] rounded-4xl font-semibold"
                onClick={toggleMenu}
              >
                <BiPlusMedical size={"1.2em"} /> Add Habit
              </button>
              {slideInMenu ? (
                <AddHabit
                  toggle={toggleMenu}
                  transform="translateX(0)"
                  right="20vw"
                  refreshMonthData={triggerFetch}
                  length={logData?.length || 0}
                  setHabitDetails={(obj) => setHabitDetails(obj)}
                />
              ) : (
                <AddHabit
                  toggle={toggleMenu}
                  transform="translateX(400px)"
                  right="-100vw"
                  refreshMonthData={triggerFetch}
                  setHabitDetails={(obj) => setHabitDetails(obj)}
                />
              )}
            </>
          </section>

          {/* outlet for different pages */}
          <Outlet
            context={{
              newHabitAdded,
              logData,
              logFetcher: logFetcherRef.current,
              setSelectedDate,
              updateNewStatus,
              statusUpdated,
              setStatusUpdated,
              selectedDate,
            }}
          />
        </div>

        {/* aside list */}
        <div className="md:col-span-2 col-span-7  flex-wrap grid gap-5 px-2 h-fit overflow-y-auto ">
          <div className=" flex justify-between ">
            <p className="text-2xl text-black font-light">
              {WMDFormat(selectedDate)}
            </p>
            <div className="flex gap-5 ">
              <IoIosArrowBack
                onClick={() => setSelectedDate((date) => changeDate(-1, date))}
                className="w-10 h-10 rounded-full border-1 border-[#AFABAB] px-2 py-1"
              />
              <IoIosArrowForward
                onClick={() => {
                  if (!isTodayOrFuture)
                    setSelectedDate((date) => changeDate(1, date));
                }}
                className={`w-10 h-10 rounded-full border-1 border-[#AFABAB] px-2 py-1 ${
                  isTodayOrFuture ? "pointer-events-none opacity-20" : ""
                }`}
              />
            </div>
          </div>
          <div className="w-full h-26/100 min-h-fit grid gap-3 overflow-y-auto border-1 border-[#AFABAB] py-4">
            {Array.isArray(logData) &&
              logData.length > 0 &&
              logData
                .sort((a, b) => a?.habitId?.order - b?.habitId?.order)
                .map((habits, i) => {
                  return (
                    <DailyHabit
                      habits={habits}
                      updateNewStatus={handleStatusUpdate}
                      dayIndex={selectedDate.getDay()}
                      handleDeleteHabit={handleDeleteHabit}
                      key={i}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
