import React from 'react'
import {setGreeting,bedTimeVariable} from "../../utils/dateUtils";
import {userName} from "../../UserData/userData";
export default function Header() {
  return (
    <>
        <h1 className="text-4xl  font-bold text-black ">
            Good {setGreeting()}, {userName}.
          </h1>
          <span className="text-gray-400 text-base font-normal px-2">
            {bedTimeVariable()}
          </span>
    </>
  )
}
