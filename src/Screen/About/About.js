import React from "react";
import "../../components/css/style.css";
import Card from "../../components/card/Card";
import Content from "./Content";
import Layout from "../../components/Layout/Layout";
// import TestimonialCard from "../../components/card/TestimonialCard";

function About() {
  return (
    <Layout>
      <div className="w-full overflow-auto">
        <header className="relative my-2">
          <h2
            className="text-[30px] font-bold mb-2 text-white1 after:content-[''] 
        after:absolute after:-bottom-1 after:left-0 after:rounded-lg after:w-[10%] sm:after:w-[20%] md:after:w-[20%] lg:after:w-[20%] tiny:after:w-[20%] after:h-[6px] after:bg-yellow1"
          >
            About Me
          </h2>
        </header>
        <Content />
        <section className="text-white2 text-h6 font-[300] leading-1 my-4">
          <h3 className="text-h3 text-white1 font-semibold tracking-wide">
            What I'm Doing?
          </h3>

          <ul className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 tiny:grid-cols-1 gap-6 p-2 py-8">
            <Card />
          </ul>
        </section>
        {/* <section className="text-white2 text-h6 font-[300] leading-1 my-4">
        <h3 className="text-h3 text-white1 font-semibold tracking-wide">
          Testimonials
        </h3>

        <ul className="flex justify-start items-start gap-6 p-2 overflow-x-auto service-list has-scrollbar py-8">
          <TestimonialCard />
        </ul>
      </section> */}
      </div>
    </Layout>
  );
}

export default About;
