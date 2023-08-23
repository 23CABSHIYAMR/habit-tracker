import React from "react";
import * as IoIcon from "react-icons/io5";
import { PiDevToLogoFill } from "react-icons/pi";

function Content() {
  const json = [
    {
      icon: (
        <IoIcon.IoMailOutline name="mail-outline" className="text-iconcolor" />
      ),
      head: "Email",
      content: (
        <a
          href="mailto:rahuldev1320@gmail.com"
          className="text-white1 text-[13px]"
        >
          rahuldev1320@gmail.com
        </a>
      ),
    },
    {
      icon: (
        <IoIcon.IoCalendarOutline
          name="calendar-outline"
          className="text-iconcolor"
        />
      ),
      head: "Birthday",
      content: (
        <time className="text-white1 text-[13px]" dateTime="2003-03-20">
          March 20, 2003
        </time>
      ),
    },
    {
      icon: (
        <IoIcon.IoLocationOutline name="location" className="text-iconcolor" />
      ),
      head: "Location",
      content: (
        <address>
          <a
            className="text-white1 text-[13px]"
            target="_blank"
            href="https://www.google.com/maps/place/Coimbatore,+Tamil+Nadu/@11.0116384,76.96685,12.01z/data=!4m5!3m4!1s0x3ba859af2f971cb5:0x2fc1c81e183ed282!8m2!3d11.0168445!4d76.9558321"
            rel="noreferrer"
          >
            Coimbatore, Tamil Nadu
          </a>
        </address>
      ),
    },
    {
      icon: <PiDevToLogoFill name="send-outline" className="text-iconcolor" />,
      head: "Resume",
      content: (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          className="text-white1 text-[13px]"
          target="_blank"
          href={require("../assets/documents/Rahul_Resume.pdf")}
          download="Rahul Resume"
          rel="noreferrer"
        >
          Click to view
        </a>
      ),
    },
  ];
  return (
    <>
      {json.map((v) => (
        <li key={v.head} className="min-w-full flex gap-4 items-center">
          <div className="icon-box">{v.icon}</div>
          <div className="max-w-[calc(100% - 46px)]  text-white1">
            <p className="uppercase text-lightgray text-[11px] mb-[2px]">
              {v.head}
            </p>
            {v.content}
          </div>
        </li>
      ))}
    </>
  );
}

export default Content;
