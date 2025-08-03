import React from 'react'
import {setGreeting,bedTimeVariable} from "../../utils/dateUtils";
export default function Header({username}) {
  return (
    <>
        <h1 className="text-4xl  font-bold text-black ">
            Good {setGreeting()}, {username}.
          </h1>
          <span className="text-gray-400 text-base font-normal px-2">
            {bedTimeVariable()}
          </span>
    </>
  )
}
