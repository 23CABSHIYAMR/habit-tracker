import React from "react";
import EducationCard from "../../components/card/EducationCard";

function ResumeContent(props) {
  const { icon, title, data } = props;
  return (
    <section className="text-white2 text-h6 font-[300] leading-1 my-6 py-2">
      <div className="w-full flex items-center sm:w-full md:w-full tiny:w-full">
        <div class="icon-box">{icon}</div>
        <h3 className="text-h3 sm:text-h4 md:text-h4 tiny:text-h4 text-white1 font-semibold tracking-wide px-4">
          {title}
        </h3>
      </div>

      <ol className="w-full flex flex-col gap-6 p-2 py-2">
        <EducationCard json={data} />
      </ol>
    </section>
  );
}

export default ResumeContent;
