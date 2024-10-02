import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl text-gray-500 pt-10">
        <p>
          CONTACT <span className="font-semibold text-gray-700">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">
            SDMIT Ujire Belthangdy <br />
            Manglore ,574240
          </p>
          <p className="text-gray-500">
            Tel: 7899864842 <br />
            Email:guruprasadbhat106@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Careers at PRESCRIPTO
          </p>
          <p className="text-gray-500">
            Learn more About our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
