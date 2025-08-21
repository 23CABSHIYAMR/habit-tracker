import React from 'react'
import {setGreeting,bedTimeVariable} from "../../utils/dateUtils";
import { useAuth } from "../../authUser/AuthContext";

export default function Header() {
  const {user}=useAuth();
  return (
    <>
        <h1 className="text-4xl  font-bold text-black ">
            Good {setGreeting()}, {user?.user?.name}.
          </h1>
          <span className="text-gray-400 text-base font-normal px-2">
            {bedTimeVariable()}
          </span>
    </>
  )
}
