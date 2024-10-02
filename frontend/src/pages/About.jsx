import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10  text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt
            tempore reiciendis nesciunt magni porro iusto minima architecto sit,
            incidunt hic, fuga, distinctio repellat molestiae possimus voluptas
            eum quia enim atque.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem modi
            eligendi aut, reiciendis architecto omnis eos quis. Eum odio iste
            molestiae ex fugiat inventore excepturi ratione error accusantium?
            Ipsa, soluta.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
            ratione qui voluptatibus harum quisquam, eius recusandae voluptate
            tempora perspiciatis in!
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-sans">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-500 text-gray-500 cursor-pointer rounded-lg">
          <b>Efficiency:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
            deleniti porro cumque inventore nobis tenetur ducimus cum commodi
            ipsum architecto?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-500 text-gray-500 cursor-pointer rounded-lg">
          <b>Convnience:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
            deleniti porro cumque inventore nobis tenetur ducimus cum commodi
            ipsum architecto?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-500 text-gray-500 cursor-pointer rounded-lg">
          <b>Personalization:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
            deleniti porro cumque inventore nobis tenetur ducimus cum commodi
            ipsum architecto?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
