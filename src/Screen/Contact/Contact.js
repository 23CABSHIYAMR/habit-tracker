import React from "react";
import Layout from "../../components/Layout/Layout";
import "../../components/css/style.css";
import ContactForm from "../../components/form/ContactForm";
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44173105597!2d76.88483315222771!3d11.014126296359155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1695733671305!5m2!1sen!2sin"
          width="100%"
          title="map"
          height="300"
          style={{ border: "0" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <ContactForm />
      </div>
    </Layout>
  );
}

export default Contact;
