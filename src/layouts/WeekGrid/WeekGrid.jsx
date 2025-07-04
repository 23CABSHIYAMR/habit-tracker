import React from "react";
import confetti from "canvas-confetti";

export default function WeekGrid({ habitLogs, handleStatusUpdate }) {

function toggleStatus(log, e) {
  const oldStatus = log.status;
  const newStatus = log.status === "completed" ? "pending" : "completed";
  log.status = newStatus;

  // Only trigger confetti when changing to completed
  if (newStatus === "completed") {
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: [log.habitId.palette || "#00FF00"],
    });
  }

  handleStatusUpdate(log, oldStatus, newStatus);
}

  return (
    <>
      {habitLogs
        ?.sort((a, b) => {
          const timeA = Date.parse(a.date);
          const timeB = Date.parse(b.date);
          return timeA - timeB;
        })
        .map((log, i) => 
          log.habitId?.weekFrequency[new Date(log.date).getDay()] ? (
            <button
              key={`${log.habitId._id}-${log.date}-${i}`}
              type="button"
              style={{
                background:
                  log.status === "completed" ? log.habitId.palette : "#b2b8c5",
              }}
              className={`w-7 h-7 rounded-sm  transition-colors duration-200 ${
                log.status === "completed" ? "" : "opacity-40 bg-gray-400"
              }`}
              onClick={(e) => toggleStatus(log,e)}
            ></button>
          ) : (
            <div
              className="w-7 h-7 pointer-events-none"
              key={`${log.habitId._id}-${log.date}-${i}`}
            ></div>
          )
        )}
    </>
  );
}
