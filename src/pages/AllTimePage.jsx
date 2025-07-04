import React from "react";
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import HorizontalBar from "../components/BarGraph/HorizontalBar";
import DisplayType from "../components/PageComponents/DisplayType/DisplayType";
import ProgressBar from "../components/PageComponents/progressBar/ProgressBar";
import HabitName from "../components/MapHabitName/HabitName";
import LoadingScreen from "../components/Loading/LoadingScreen";

import { monthNames } from "../constants/constants";
import { fetchHabits } from "../services/habitData";
import { createdDate } from "../UserData/userData";

import { FaArrowUp } from "react-icons/fa";
// import {getCompletedCount} from "../utils/fetchingLog"
export default function AllTimePage() {
  const { logData, statusUpdated, logFetcher,newHabitAdded } = useOutletContext() ?? {};
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
    for (const habit of data) {
      const progress = logFetcherRef.current.getCompletedCount(habit);
      completedArr.push({ count: progress.count });
      freqArr.push(progress.totalFreq);
    }
    setCompletedList(completedArr);
    setTotalFreq(freqArr);
  }, [data]);

  return (
    <section className="w-full h-fit  flex flex-col gap-5  ">
      <div
        className="w-full   flex justify-between items-center"
        id="weekChanger-line"
      >
        {/* Week to Week column */}
        <div className="max-w-3/4 inline-flex items-center gap-3 text-2xl">
          {`${
            monthNames[createdDate.getMonth()]
          } ${createdDate.getDate()}, ${createdDate.getFullYear()} - Today`}
        </div>
        <>
          <DisplayType updateDisplayType={() => {}} />
        </>
      </div>
      <ProgressBar progressVal={38} />
      <div className="w-full flex justify-between items-center text-lg font-light">
        <span className="w-1/3 flex items-center">
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
            {data.length > 0 &&
              completedList.length > 0?
              data?.map((h, i) => {
                console.log(completedList, totalFreq, "freq list here");
                return (
                  <div
                    className="grid col-span-7 content-between gap-10"
                    key={h._id}
                  >
                    <HorizontalBar
                      key={i}
                      habit={completedList[i]}
                      range={totalFreq[i]}
                      palette={h.palette}
                    />
                  </div>
                );
              }):
              <LoadingScreen/>
              }
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
