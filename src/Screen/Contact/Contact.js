import React from "react";
import Layout from "../../components/Layout/Layout";
function Contact() {
  return (
    <Layout>
      <div className="w-full overflow-auto px-4">
        <header className="relative my-2">
          <h2
            className="text-[30px] font-bold mb-2 text-white1 after:content-[''] 
  after:absolute after:-bottom-1 after:left-0
   after:rounded-lg after:w-[10%] sm:after:w-[20%] md:after:w-[10%] 
    lg:after:w-[10%] tiny:after:w-[20%] after:h-[6px] after:bg-yellow1"
          >
            Contact
          </h2>
        </header>
        <div className="flex justify-start gap-5 py-4"></div>
        <div className="w-full grid grid-cols-3 sm:grid-cols-1 gap-4 tiny:grid-cols-1 md:grid-cols-2 ">
          {/* <ProjectCard data={data} /> */}
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
