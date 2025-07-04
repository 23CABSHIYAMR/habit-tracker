import React, { useEffect, useState } from "react";
import { loadingItems, ColorPalette } from "../../constants/constants";

export default function LoadingScreen() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loaderName = loadingItems[counter % loadingItems.length];

  return (
    <div
      className="w-full h-full flex items-center justify-center text-2xl"
      style={{ color: ColorPalette[counter % loadingItems.length] }}
    >
      {loaderName}
    </div>
  );
}
