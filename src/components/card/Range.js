import React from "react";

function Range(props) {
  const { data } = props;
  return (
    <>
      {data.map((v) => (
        <li className="w-full my-1 p-1">
          <div className="flex items-center gap-1 mb-4">
            <h5 className="text-h6 sm:text-base md:text-base tiny:text-base  text-white1 font-semibold tracking-wider ">
              {v.title}
            </h5>
            <data value={v.percent} className="text-tiny">
              {v.percent}%
            </data>
          </div>

          <div className="h-[6px] w-full bg-jetcolor rounded-card">
            <div
              className={` h-[100%] w-[${v.percent}%] rounded-card bg-text-active`}
            ></div>
          </div>
        </li>
      ))}
    </>
  );
}

export default Range;
