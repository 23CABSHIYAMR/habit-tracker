import React, { useState } from "react";
import "../css/style.css";
import { GoPaperAirplane } from "react-icons/go";

var className = `w-full h-[50px] rounded-lg px-3 py-2 bg-[transparent]
border placeholder:font-medium placeholder:leading-8 text-[#fff]
placeholder:text-[#d6d6d6b3]
placeholder:text-h6 focus:outline-none`;

function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorval, setErrorVal] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSaveClick, setIsSaveClick] = useState(false);
  const validation = (values) => {
    let errors = {};
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (values.email === "") {
      errors.email = "Email is Required*";
    } else if (!regex.test(values.email)) {
      errors.email = "Email should be correct format*";
    }
    if (values.name === "") {
      errors.name = "Name is Required*";
    }
    if (values.message === "") {
      errors.message = "Message is Required*";
    }
    return errors;
  };

  const handleChanges = ({ name, value }) => {
    errorval[name] = value;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    if (isSaveClick) {
      setErrors(validation(values));
    }
  };

  const handleSubmit = () => {
    setIsSaveClick(true);
    let errors = validation(errorval);
    console.log(errors);
    setErrors(errors);
    if(Object.keys(errors).length===0){
      setValues({
        name: "",
        email: "",
        message: "",
      })
      setErrorVal({
        name: "",
        email: "",
        message: "",
      })
    }
  };
  
  return (
    <section className="text-white2 text-h6 font-[300] leading-1 my-4 w-full sm:my-4 tiny:my-4 md:my-4">
      <h3 className="text-h2 text-white1 font-bold my-2">Contact Form</h3>
      <div className="w-full grid grid-cols-2 sm:grid-cols-1 gap-4 tiny:grid-cols-1 md:grid-cols-2 ">
        <div className="w-full my-4">
          <input
            className={
              className +
              `${!errors.name ? "  border-[#949494]" : "  border-[#FF5733]"}`
            }
            value={values?.name ?? ""}
            name="name"
            onChange={(e) => handleChanges(e.target)}
            autoComplete="off"
            placeholder="Full name"
          />
        </div>
        <div className="w-full my-4">
          <input
            className={
              className +
              `${!errors.email ? "  border-[#949494]" : "  border-[#FF5733]"}`
            }
            value={values?.email ?? ""}
            name="email"
            onChange={(e) => handleChanges(e.target)}
            placeholder="Email Address"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-4 tiny:grid-cols-1 md:grid-cols-1 ">
        <div className="w-full my-4">
          <textarea
            onChange={(e) => handleChanges(e.target)}
            value={values?.message ?? ""}
            name="message"
            autoComplete="off"
            className={`w-full h-[120px] rounded-lg px-3 py-2 bg-[transparent] ${
              !errors.message ? "  border-[#949494]" : "  border-[#FF5733]"
            }
       border placeholder:font-medium placeholder:leading-8 text-[#fff]
       placeholder:text-[#d6d6d6b3]
       placeholder:text-h6 focus:outline-none`}
            placeholder="Your Message"
          ></textarea>
        </div>
      </div>
      <div className="w-full gap-4 flex justify-end items-end">
        <button
          className="w-max p-4 text-h6 relative bg-onyx text-text-active 
        justify-center items-center gap-2 flex rounded-lg shadow-btn transition 
        duration-300 font-medium tracking-wide form-btn"
          type="submit"
          onClick={() => handleSubmit()}
        >
          <GoPaperAirplane />
          Send Message
        </button>
      </div>
    </section>
  );
}

export default ContactForm;
