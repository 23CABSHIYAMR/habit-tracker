import React from "react";
import "../css/style.css";
import {GoPaperAirplane}from'react-icons/go'
function ContactForm() {
  return (
    <section className="text-white2 text-h6 font-[300] leading-1 my-4 w-full sm:my-4 tiny:my-4 md:my-4">
      <h3 className="text-h2 text-white1 font-bold my-2">Contact Form</h3>
      <div className="w-full grid grid-cols-2 sm:grid-cols-1 gap-4 tiny:grid-cols-1 md:grid-cols-2 ">
        <div className="w-full my-4">
          <input
            className="w-full h-[50px] rounded-lg px-3 py-2 bg-[transparent] border-[#949494]
       border placeholder:font-medium placeholder:leading-8
       placeholder:text-[#d6d6d6b3]
       placeholder:text-h6 focus:outline-none"
            placeholder="Full name"
          />
        </div>
        <div className="w-full my-4">
          <input
            className="w-full h-[50px] rounded-lg px-3 py-2 bg-[transparent] border-[#949494]
       border placeholder:font-medium placeholder:leading-8
       placeholder:text-[#d6d6d6b3]
       placeholder:text-h6 focus:outline-none"
            placeholder="Email Address"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-4 tiny:grid-cols-1 md:grid-cols-1 ">
        <div className="w-full my-4">
          <textarea
            name="message"
            className="w-full h-[120px] rounded-lg px-3 py-2 bg-[transparent] border-[#949494]
       border placeholder:font-medium placeholder:leading-8
       placeholder:text-[#d6d6d6b3]
       placeholder:text-h6 focus:outline-none"
            placeholder="Your Message"
          ></textarea>
        </div>
      </div>
      <div className="w-full gap-4 flex justify-end items-end">
        <button
          class="w-max p-4 text-h6 relative bg-onyx text-text-active 
        justify-center items-center gap-2 flex rounded-lg shadow-btn transition 
        duration-300 font-medium tracking-wide form-btn"
          type="submit"
        >
          <GoPaperAirplane />
          Send Message
        </button>
      </div>
    </section>
  );
}

export default ContactForm;
