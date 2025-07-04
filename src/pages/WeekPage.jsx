import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
//icons
import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
//components
import ProgressBar from "../components/PageComponents/progressBar/ProgressBar";
import DisplayType from "../components/PageComponents/DisplayType/DisplayType";
import HorizontalBar from "../components/BarGraph/HorizontalBar";
import HabitName from "../components/MapHabitName/HabitName";
import LoadingScreen from "../components/Loading/LoadingScreen";
import WeekGrid from "../layouts/WeekGrid/WeekGrid";
//utils
import { getWeekRange, changeDate, getWeekStart } from "../utils/dateUtils";
import { IsoDate, WMDFormat } from "../utils/dateFormat";
import { dayNames } from "../constants/constants";
export default function WeekPage() {
  const {
    newHabitAdded,
    logFetcher,
    updateNewStatus,
    logData,
    statusUpdated,
    setStatusUpdated,
    selectedDate,
  } = useOutletContext() ?? {};
  const logFetcherRef = useRef(logFetcher);

  const [weekStart, setWeekStart] = useState(() => getWeekStart());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const [isThisWeek, setIsThisWeek] = useState(true);
  useEffect(() => {
    const thisStart = getWeekStart();
    setIsThisWeek(
      new Date(weekStart).toISOString().split("T")[0] ===
        thisStart.toISOString().split("T")[0]
    );
    console.log("status update should be active? ", isThisWeek);
    setWeeklyLogs([]);
    setProgress(0);
  }, [weekStart]);

  const [displayType, setDisplayType] = useState("grid");
  const updateDisplayType = (type) => {
    setDisplayType(type);
  };

  const [weeklyLogs, setWeeklyLogs] = useState([]);

  //frequencyList
  const [totalFreq, setTotalFreq] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [progress, setProgress] = useState(0);

  const loadAllWeekLogs = useCallback(async () => {
    const weekRange = getWeekRange(weekStart);
    const weekLogs = await logFetcherRef.current.getCachedWeekData(weekRange);
    console.log("response recieved=>", weekLogs);
    setWeeklyLogs(weekLogs);

    console.log(statusUpdated);
    const freqList = weekLogs?.map((habitLogs) =>
      habitLogs.reduce(
        (acc, log, index) => acc + (log.habitId.weekFrequency[index] ? 1 : 0),
        0
      )
    );
    const completedList = weekLogs?.map((habitLogs) => {
      const count = habitLogs.reduce((acc, log, idx) => {
        return (
          acc +
          (log.status === "completed" && log.habitId.weekFrequency[idx] ? 1 : 0)
        );
      }, 0);
      return { count };
    });
    if (freqList.length > 0 && completedList.length > 0) {
      const totalFrequency = freqList?.reduce((acc, val) => acc + val, 0);
      const totalCompleted = completedList?.reduce(
        (acc, arr) => acc + arr.count,
        0
      );
      setProgress(() =>
        Number(((totalCompleted / totalFrequency) * 100).toFixed(1))
      );
    }
    setTotalFreq(freqList);
    setCompletedList(completedList);
  }, [weekStart, statusUpdated]);

  useEffect(() => {
    const fetchIfNeeded = async () => {
      if (!statusUpdated) return;
      await loadAllWeekLogs();
    };
    fetchIfNeeded();
  }, [statusUpdated]);
  useEffect(() => {
    const startDate = new Date(weekStart);
    (async () => {
      await logFetcherRef.current.prefetchMonthSurroundings(startDate);
      await loadAllWeekLogs();
    })();
  }, [weekStart, loadAllWeekLogs, statusUpdated]);
  useEffect(() => {
    const startOfWeek = getWeekStart(selectedDate);
    setWeekStart(startOfWeek);
  }, [selectedDate]);
  useEffect(() => {
    (async () => {
      await logFetcherRef.current.resetAllData();
      await logFetcherRef.current.prefetchMonthSurroundings(selectedDate);
      await loadAllWeekLogs();
    })();
  }, [newHabitAdded]);
  const handleStatusUpdate = useCallback(
    async (habit, oldStatus, status) => {
      if (!isThisWeek) {
        console.log("update aborted");
        return;
      }
      console.log("called for update");

      await updateNewStatus(habit, oldStatus, status);
      setStatusUpdated(`${IsoDate(habit.date)}-${Date.now()}`);
    },
    [updateNewStatus, isThisWeek]
  );
  useEffect(() => {
    const checkIfSelectedDateInWeek = async () => {
      if (!selectedDate) return;
      const selected = IsoDate(new Date(selectedDate));
      const weekSet = new Set(
        getWeekRange(weekStart).map((d) => IsoDate(new Date(d)))
      );
      if (weekSet.has(selected)) {
        await loadAllWeekLogs();
      }
    };
    checkIfSelectedDateInWeek();
  }, [selectedDate, weekStart, statusUpdated]);

  return (
    <>
      <section className="w-full h-fit  flex flex-col gap-5  ">
        <div
          className="w-full   flex justify-between items-center"
          id="weekChanger-line"
        >
          {/* Week to Week column */}
          <div className="max-w-3/4 inline-flex items-center gap-3 text-2xl">
            <IoIosArrowBack
              onClick={() => setWeekStart((date) => changeDate(-7, date))}
              className="w-10 h-10 rounded-full border-1 border-[#AFABAB] px-2 py-1"
            />
            <IoIosArrowForward
              onClick={() => {
                if (!isThisWeek) setWeekStart((date) => changeDate(7, date));
              }}
              className={`w-10 h-10 rounded-full border-1 border-[#AFABAB] px-2 py-1 
    ${isThisWeek ? "text-gray-400 pointer-events-none opacity-20" : ""}
    `}
            />
            {`${WMDFormat(weekStart)} - ${WMDFormat(weekEnd)}`}
          </div>
          <>
            <DisplayType
              grid={true}
              updateDisplayType={(type) => updateDisplayType(type)}
              displayType={displayType}
            />
          </>
        </div>
        {/* have to get Progress from db and assign it here */}
        <ProgressBar progressVal={progress || 0} />
        <div className="w-full flex justify-between items-center text-lg font-light">
          <span className="w-1/3 flex items-center">
            <FaArrowUp color="#09FD11" />
            &nbsp; Up 50% from the week before
          </span>
          <span>{progress}% achieved</span>
        </div>

        <div
          id="dividing-line"
          className="w-full border-1 border-[#d3dfe8] "
        ></div>
      </section>
      <main className="w-full h-fit  grid py-2">
        {/* dayNames */}
        {displayType === "grid" && (
          <section className="w-full  grid grid-cols-10 mb-4 ">
            <div className="md:col-span-2 flex  text-[#9c9c9c]"></div>
            {dayNames.map((day, i) => (
              <div key={i} className="text-[#9c9c9c]  text-center">
                {day}
              </div>
            ))}
            <div className="md:col-span-1 "></div>
          </section>
        )}
        <section className="w-full h-fit grid grid-cols-10 grid-rows-7 ">
          <HabitName logData={logData} />
          {/* bar-chart or checkboxes on user-pref, occupies 7columns */}
          <section className=" h-full col-span-7 grid content-between">
            {weeklyLogs.length > 0 &&
            completedList.length === weeklyLogs.length ? (
              weeklyLogs
                .sort((a, b) => a[0]?.habitId.order - b[0]?.habitId.order)
                .map((habit, i) =>
                  displayType === "bar" ? (
                    //HORIZONTAL_BAR
                    <div
                      className="grid col-span-7 content-between gap-10 "
                      key={i}
                    >
                      <HorizontalBar
                        key={habit._id}
                        habit={completedList[i]}
                        range={totalFreq[i]}
                        palette={habit[0]?.habitId?.palette}
                      />
                    </div>
                  ) : (
                    //WEEKGRID
                    <div
                      className=" col-span-1 h-fit flex justify-around "
                      key={habit[0].habitId._id}
                    >
                      <WeekGrid
                        key={habit._id}
                        habitLogs={habit}
                        hIndex={i}
                        handleStatusUpdate={handleStatusUpdate}
                      />
                    </div>
                  )
                )
            ) : (
              <LoadingScreen />
            )}
          </section>
          {/* last column for */}
          <div className="h-full grid col-span-1  content-between ">
            {completedList.length === totalFreq.length &&
              completedList.length > 0 &&
              completedList.map((ob, index) => (
                <div
                  className="grid grid-rows-1 text-[#9c9c9c]  text-end"
                  key={index}
                >{`${ob.count} / ${totalFreq[index]}`}</div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
