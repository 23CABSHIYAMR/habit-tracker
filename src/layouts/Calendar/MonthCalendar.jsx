import { dayNames } from "../../constants/constants";
import { getMonthKey } from "../../utils/dateFormat";
import { generateMonthDates } from "../../utils/dateUtils";

export default function MonthCalendar({ month, logsByDate }) {
  const monthKey = getMonthKey(month);
  const allDates = generateMonthDates(monthKey);
  const completed = {};
  for (const date of logsByDate) {
    let count = 0;
    for (const logs of date) {
      count += logs.status === "completed" ? 1 : 0;
    }
    const newDate = new Date(date[0].date);

    completed[newDate.getDate()] = (count / date.length) * 100;
  }
  return (
    <div className="col-span-10 w-full h-full">
      <section className="w-full  grid grid-cols-7 py-2 border border-[#c0c2c5]">
        {dayNames.map((day, i) => (
          <div key={i} className="  text-center text-[#325f92] ">
            {day.toUpperCase()}
          </div>
        ))}
      </section>
      <section className="grid grid-cols-7">
        {allDates.map((date, i) => {
          let curDate='';
          if(date!=0){
            curDate= date>=10?date:'0'+date;
          }
          return (
            <div
              key={i}
              className="p-1  h-[7rem] col-span-1 border-1 text-xl text-[#c0c2c5] flex justify-between border-[#b8bcc8]"
            >
              <div className="h-full  flex items-end text-black font-light text-lg">
                {completed[date] ? `${completed[date]}%` : ""}
              </div>
              <div className="text-base">{curDate}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
