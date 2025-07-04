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
import MonthCalendar from "../layouts/Calendar/MonthCalendar";

//utils
import { changeMonth, getWeekStart } from "../utils/dateUtils";
import { MYFormat, getMonthKey, IsoDate } from "../utils/dateFormat";
export default function MonthPage() {
  const { newHabitAdded, logFetcher, logData } = useOutletContext() ?? {};
  const logFetcherRef = useRef(logFetcher);

  const [month, setMonth] = useState(() => getWeekStart());
  const [isThisMonth, setisThisMonth] = useState(true);
  useEffect(() => {
    const thisStart = getWeekStart();
    setisThisMonth(IsoDate(month) === IsoDate(thisStart));
    setmonthLog([]);
    setProgress(0);

    logFetcherRef.current?.prefetchMonthSurroundings(month);
  }, [month]);

  const [displayType, setDisplayType] = useState("grid");
  const updateDisplayType = (type) => {
    setDisplayType(type);
  };

  const [monthLog, setmonthLog] = useState([]);

  //frequencyList
  const [totalFreq, setTotalFreq] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [logsByDate, setLogsByDate] = useState([]);
  const loadFullMonthLogs = useCallback(async () => {
    const monthKey = getMonthKey(month);
    const [monthlyLogs, logsByDate] =
      await logFetcherRef.current.getCachedMonthData(monthKey);
    console.log("response recieved=>", monthlyLogs);
    setmonthLog(monthlyLogs);
    setLogsByDate(logsByDate);
    const freqList = monthlyLogs?.map((habitLogs) =>
      habitLogs.reduce((acc, log) => {
        const day = new Date(log.date);
        return acc + (log.habitId?.weekFrequency[day.getDay()] ? 1 : 0);
      }, 0)
    );
    const completedList = monthlyLogs?.map((habitLogs) => {
      const count = habitLogs.reduce((acc, log) => {
        const day = new Date(log.date);
        return (
          acc +
          (log.status === "completed" && log.habitId?.weekFrequency[day.getDay()]
            ? 1
            : 0)
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
  }, [month]);

  useEffect(() => {
    const startDate = new Date(month);
    (async () => {
      await logFetcherRef.current?.prefetchMonthSurroundings(startDate);
      await loadFullMonthLogs();
    })();
  }, [month, newHabitAdded, loadFullMonthLogs]);

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
              onClick={() => setMonth((date) => changeMonth(-1, date))}
              className="w-10 h-10 rounded-full border-1 border-[#AFABAB] px-2 py-1"
            />
            <IoIosArrowForward
              onClick={() => {
                if (!isThisMonth) setMonth((date) => changeMonth(1, date));
              }}
              className={`w-10 h-10 rounded-full border-1 border-[#AFABAB] px-2 py-1 
    ${isThisMonth ? "text-gray-400 pointer-events-none opacity-20" : ""}
    `}
            />
            {`${MYFormat(month)}`}
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
      <main className="w-full  grid py-2">
        <section className="w-full h-full grid grid-cols-10 grid-rows-7 ">
          {displayType === "bar" && <HabitName logData={logData} />}
          {/* bar-chart or checkboxes on user-pref, occupies 7columns */}
          <>
            {monthLog.length > 0 && completedList.length === monthLog.length ? (
              <>
                {displayType === "grid" && (
                  <MonthCalendar month={month} logsByDate={logsByDate} />
                )}
                <section className=" h-full col-span-7 grid content-between">
                  {displayType === "bar" &&
                    monthLog
                      .sort((a, b) => a[0]?.habitId.order - b[0]?.habitId.order)
                      .map((habit, i) => (
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
                      ))}
                </section>
              </>
            ) : (
              <div className="w-full h-full col-span-10 items-center">
                <LoadingScreen />
              </div>
            )}
          </>
          {/* last column for */}
          {displayType === "bar" && (
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
          )}
        </section>
      </main>
    </>
  );
}
