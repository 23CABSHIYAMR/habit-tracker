import React, { useEffect, useState } from "react";

export default function HorizontalBar({ habit, range, palette }) {
  let targetWidth = 0;
  try {
    targetWidth = (habit.count / range) * 100;
  } catch (err) {
    console.error("Cannot assign bar", err);
  }

  const [width, setWidth] = useState("0%");

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(`${targetWidth}%`);
    }, 50);
    return () => clearTimeout(timer);
  }, [targetWidth]);

  return (
    <div className="w-full h-8 p-0 bg-gray-100 rounded-sm overflow-hidden">
      <div
        className="h-full rounded-sm transition-all duration-700 ease-in-out"
        style={{
          background: palette,
          width: width,
        }}
      ></div>
    </div>
  );
}
