/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import * as IoIcon from "react-icons/io5";

function SocialMedia() {
  const json = [
    {
      href: "https://www.linkedin.com/in/rahul-r-8b0a6a24a/",
      icon: <IoIcon.IoLogoLinkedin className="text-h4 text-white2 " />,
    },
    {
      href: "https://github.com/RAHUL13200",
      icon: <IoIcon.IoLogoGithub className="text-h4 text-white2" />,
    },
    {
      href: "https://twitter.com/rahulammu1320",
      icon: <IoIcon.IoLogoTwitter className="text-h4 text-white2 " />,
    },
    // {
    //   href: "https://www.instagram.com/rahul_20x03/",
    //   icon: <IoIcon.IoLogoInstagram className="text-h4 text-white2 " />,
    // },
  ];
  return (
    <>
      {json.map((v) => (
        <li className="social-item" key={v.href}>
          <a href={v.href} className="social-link" target="_blank">
            {v.icon}
          </a>
        </li>
      ))}
    </>
  );
}

export default SocialMedia;
