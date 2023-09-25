import React from "react";
import * as IoIcon from "react-icons/io5";

function Card() {
  const json = [
    {
      icon: <IoIcon.IoCodeOutline name="web-code" className="text-iconcolor" />,
      title: "Web design",
      quote: `"Look great on the web"`,
      para: ` I Develope a website which has designing the layout, User interface,
          Defining the site's architecture.`,
    },
    {
      icon: (
        <IoIcon.IoDesktopOutline name="web-code" className="text-iconcolor" />
      ),
      title: "Web Development",
      quote: `"Observe, Shape, Supremacy, Shine."`,
      para: ` I am a Full Stack Web Developer (MERN) and have quite some experience
          in it as well.`,
    },
    {
      icon: (
        <IoIcon.IoPhonePortraitOutline
          name="web-code"
          className="text-iconcolor"
        />
      ),
      title: "Mobile App Development",
      quote: `"Create, organize. That’s the way I code"`,
      para: `Professional development of applications for iOS and Android.`,
    },
  ];
  return (
    <>
      {json.map((v) => (
        <li
          key={v.title}
          className="xl:min-w-[50%] 2xl:min-w-[50%] 3xl:min-w-[50%] sm:min-w-full tiny:min-w-full
         md:min-w-[50%] lg:min-w-[50%] snap-center z-10"
        >
          <div className="relative bg-bgcard p-4 flex flex-col justify-center items-center rounded-lg shadow-card2 cursor-pointer z-1">
            <div className="flex justify-start items-center w-full h-full  mb-2">
              <figure className="text-h2 w-[10%]">{v.icon}</figure>
              <h4 className="text-h5 text-white1 font-semibold  w-[90%] px-4">
                {v.title}
              </h4>
            </div>
            <div className="overflow-hidden w-full overflow-text-wrap  text-ellipsis flex flex-col justify-start text-left items-center ">
              <p className="w-full text-left"> {v.quote}</p>
              <p className="w-full text-left">{v.para}</p>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default Card;
