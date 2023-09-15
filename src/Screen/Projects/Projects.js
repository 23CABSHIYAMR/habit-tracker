import React from "react";
import Layout from "../../components/Layout/Layout";

function Projects() {
  return (
    <Layout>
      <div className="w-full overflow-auto">
        <header className="relative my-2">
          <h2
            className="text-[30px] font-bold mb-2 text-white1 after:content-[''] 
    after:absolute after:-bottom-1 after:left-0
     after:rounded-lg after:w-[10%] sm:after:w-[20%] md:after:w-[10%] 
      lg:after:w-[10%] tiny:after:w-[20%] after:h-[6px] after:bg-yellow1"
          >
            Projects
          </h2>
        </header>
        {/* <div className="w-full grid grid-cols-2 sm:grid-cols-1 tiny:grid-cols-1 md:grid-cols-2 ">
          <ResumeContent
            icon={<TfiBook name="Education" className="text-iconcolor" />}
            title={"Education"}
            data={educationdetails}
          />
          <ResumeContent
            icon={<TfiBook name="Education" className="text-iconcolor" />}
            title={"Experience"}
            data={workdetails}
          />
        </div> */}
      </div>
    </Layout>
  );
}

export default Projects;
