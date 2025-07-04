import React from "react";
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import HorizontalBar from "../components/BarGraph/HorizontalBar";
import DisplayType from "../components/PageComponents/DisplayType/DisplayType";
import ProgressBar from "../components/PageComponents/progressBar/ProgressBar";
import HabitName from "../components/MapHabitName/HabitName";

import { yearFormat, changeYear } from "../utils/dateUtils";
import { fetchHabits } from "../services/habitData";
import { createdDate } from "../UserData/userData";

import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoadingScreen from "../components/Loading/LoadingScreen";

export default function YearPage() {
  const { logData, statusUpdated, logFetcher,newHabitAdded } = useOutletContext() ?? {};
  const today = new Date();
  const [year, setSelectedYear] = useState(new Date(today));
  const [inYearRange, setInYearRange] = useState("thisYear");
  useEffect(() => {
    setInYearRange(() => {
      const today = new Date();
      if (year.getFullYear() === createdDate.getFullYear())
        return "cDateReached";
      return year.getFullYear() === today.getFullYear() ? "thisYear" : "valid";
    });
    console.log(year);
  }, [year]);
  // const year = new Date(createdDate);
  const logFetcherRef = useRef(logFetcher);
  const [data, setData] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [totalFreq, setTotalFreq] = useState([]);
  useEffect(() => {
    async function loadHabits() {
      const habits = await fetchHabits();
      setData(habits);
    }
    loadHabits();
  }, [statusUpdated,newHabitAdded]);

  useEffect(() => {
    const completedArr = [];
    const freqArr = [];
    const endDate = new Date(year);
    const startDate = new Date(year);
    startDate.setFullYear(
      year.getFullYear() - 1,
      year.getMonth(),
      year.getDate() + 1
    );
    for (const habit of data) {
      const progress = logFetcherRef.current.getCompletedCount(
        habit,
        startDate,
        endDate
      );
      completedArr.push({ count: progress.count });
      freqArr.push(progress.totalFreq);
    }
    setCompletedList(completedArr);
    setTotalFreq(freqArr);
  }, [year, data]);
  return (
    <section className="w-full h-fit  flex flex-col gap-5  ">
      <div
        className="w-full   flex justify-between items-center"
        id="weekChanger-line"
      >
        {/* Week to Week column */}
        <div className="max-w-3/4 inline-flex items-center gap-3 text-2xl">
          <IoIosArrowBack
            onClick={() => {
              if (inYearRange !== "cDateReached")
                setSelectedYear((date) => changeYear(-1, date));
            }}
            className={`w-10 h-10 rounded-full border-1 border-[#AFABAB] px-2 py-1
              ${
                inYearRange === "cDateReached" &&
                "text-gray-400 pointer-events-none opacity-20"
              }
              `}
          />
          <IoIosArrowForward
            onClick={() => {
              if (inYearRange !== "thisYear")
                setSelectedYear((date) => changeYear(1, date));
            }}
            className={`w-10 h-10 rounded-full border-1 border-[#AFABAB] px-2 py-1 
               ${
                 inYearRange === "thisYear" &&
                 "text-gray-400 pointer-events-none opacity-20"
               }
              `}
          />
          {`${yearFormat(year)}`}
        </div>
        <>
          <DisplayType updateDisplayType={() => {}} />
        </>
      </div>
      <ProgressBar progressVal={38} />
      <div className="w-full flex justify-between items-center text-lg font-light">
        <span className="w-1/3 flex items-center">
          <FaArrowUp color="#09FD11" />
          &nbsp; Up 50% from the year before
        </span>
        <span>{38}% achieved</span>
      </div>

      <div
        id="dividing-line"
        className="w-full border-1 border-[#AFABAB] "
      ></div>
      <main className="w-full h-fit  grid py-2">
        <section className="w-full h-fit grid grid-cols-10 grid-rows-7">
          <HabitName logData={logData || []} />
          <section className="h-full col-span-7 grid content-between ">
            {data.length > 0 && completedList.length > 0 ? (
              data?.map((h, i) => {
                console.log(completedList[i], totalFreq[i]);
                return (
                  <div className="grid col-span-7 content-between gap-10">
                    <HorizontalBar
                      key={i}
                      habit={completedList[i]}
                      range={totalFreq[i]}
                      palette={h.palette}
                    />
                  </div>
                );
              })
            ) : (
              <LoadingScreen />
            )}
          </section>
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
    </section>
  );
}
