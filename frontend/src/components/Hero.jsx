import React from "react";
import Navbar from "./Navbar";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const [sidebar, setSidebar] = React.useState(false);
  const navigate = useNavigate();
  return (
    <main className="md:px-12 md:py-6 bg-primaryDark">
      <section className="relative min-h-[650px] bg-gradient-to-r from-primary to-secondary w-full md:rounded-xl shadow-md">
        <div className="container">
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center min-h-[665px]">
            {/* text-content-section */}
            <div className="text-white mt-[100px] md:mt-0 p-4 space-y-4 z-10 relative">
              <h1
                data-aos="fade-right"
                data-aos-delay="300"
                className="text-3xl pl-6 md:pl-14 "
              >
                01________
              </h1>
              <h1
                data-aos="fade-up"
                className="text-5xl font-bold uppercase text-shadow"
              >
                Debate. Persuade. Win.
              </h1>
              <p data-aos="fade-up" data-aos-delay="300" className="text-sm">
                Step into the world of competitive debate. Sharpen your arguments,
                challenge your peers, and become a master of persuasion. Join a
                vibrant community, learn new skills, and make your mark in the
                arena of ideas.
              </p>
              <button
                onClick={() => navigate('/lobby')}
                data-aos="fade-up"
                data-aos-delay="500"
                className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                Start Debating
              </button>
            </div>
            {/* blank div section only for desktop screen */}
            <div className="md:hidden"></div>
          </div>
        </div>
        <h1
          data-aos="zoom-out"
          className="text-center text-[80px] sm:text-[120px] md:text-[150px] xl:text-[180px]  text-white uppercase font-bold absolute bottom-0 w-full z-0 text-shadow"
        >
          debate
        </h1>
        {sidebar && (
          <div className="absolute top-0 right-0 w-[120px] h-full bg-gradient-to-b from-primary to-secondary z-10">
            <div className="w-full h-full flex justify-center items-center">
              <div className="text-white flex flex-col justify-center items-center gap-6">
                {/* line */}
                <div className="w-[1px] h-[70px] bg-white"></div>
                <div className="inline-block p-2 rounded-full cursor-pointer border border-white">
                  <FaFacebookF className="text-2xl" />
                </div>
                <div className="inline-block p-2 rounded-full cursor-pointer border border-white">
                  <FaInstagram className="text-2xl" />
                </div>
                <div className="inline-block p-2 rounded-full cursor-pointer border border-white">
                  <FaLinkedinIn className="text-2xl" />
                </div>
                {/* line */}
                <div className="w-[1px] h-[70px] bg-white"></div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Hero;