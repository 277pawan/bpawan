import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils.js";
import "../Projects/Projects.css";

// IMAGES
import geoLocationImage from "../../Assets/geolocation.png";
import BankistImage from "../../Assets/Bankist.png";
import SpaceInvaderImage from "../../Assets/SpaceInvader.png";
import MaxtechImage from "../../Assets/Maxtech.png";
import ShineWavesImage from "../../Assets/Shine-Wave.png";
import FormBuilderImage from "../../Assets/Form-builder.png";

interface Element {
  id: number;
  height: number;
  img: string;
  title: string;
  description: string;
  link1: string;
  link2: string;
}

const items: Element[] = [
  {
    id: 2,
    height: 350,
    img: SpaceInvaderImage,
    title: "Space Invader",
    description:
      "A fully animated HTML5 canvas game with sound effects, enemy waves and smooth controls...",
    link1: "https://277pawan.github.io/Spaceinvaders/",
    link2: "https://github.com/277pawan/Spaceinvaders",
  },
  {
    id: 3,
    height: 300,
    img: BankistImage,
    title: "Bankist Website",
    description:
      "A mini virtual ATM with client-side data, money transfer, loan system and transaction history.",
    link1: "https://277pawan.github.io/Bankist/",
    link2: "https://github.com/277pawan/Bankist",
  },
  {
    id: 4,
    height: 250,
    img: FormBuilderImage,
    title: "Form-Builder",
    description:
      "A dynamic form generator for React apps. Build complex forms by defining only input types.",
    link1: "https://www.npmjs.com/package/react-form-toaster",
    link2: "https://github.com/277pawan/form-builder",
  },
  {
    id: 5,
    height: 400,
    img: ShineWavesImage,
    title: "Shine-Waves",
    description:
      "A beautiful 3D shining wave animation with fully customizable amplitude, colors and frequency.",
    link1: "https://277pawan.github.io/Shine-waves/",
    link2: "https://github.com/277pawan/Shine-Waves",
  },
  {
    id: 6,
    height: 350,
    img: geoLocationImage,
    title: "GeoLocation Tracker",
    description:
      "Track your real-time routes for running & cycling with a fully working Google Maps integration.",
    link1: "https://277pawan.github.io/Geolocation-tracker/",
    link2: "https://github.com/277pawan/Geolocation-tracker",
  },
];

const One: React.FC = () => {
  const [activeItem, setActiveItem] = useState<Element>(items[0]);

  return (
    <div className="w-full relative overflow-hidden">
      {/* ---- ACTIVE ITEM FULL VIEW ---- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-[94%] h-[56vh] rounded-3xl overflow-hidden  mx-auto relative"
        >
          <img
            src={activeItem.img}
            alt={activeItem.title}
            className="w-full h-full object-cover"
          />

          {/* TEXT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col justify-end">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {activeItem.title}
            </h2>
            <p
              style={{ fontFamily: "itim" }}
              className="text-white/90 text-sm md:text-base max-w-2xl mt-2 line-clamp-4"
            >
              {activeItem.description}
            </p>

            <div className="flex gap-4 mt-4">
              <a
                href={activeItem.link1}
                target="_blank"
                className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white"
              >
                View Site
              </a>
              <a
                href={activeItem.link2}
                target="_blank"
                className="px-4 py-2 bg-white rounded-full text-black"
              >
                Github
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ---- BOTTOM CAROUSEL ---- */}
      <div
        className="flex flex-row justify-center gap-4 mt-6 w-full overflow-x-auto pb-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((ele) => (
          <motion.div
            key={ele.id}
            onClick={() => setActiveItem(ele)}
            className="min-w-[150px] h-[100px] rounded-xl overflow-hidden cursor-pointer border-2 border-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={ele.img}
              alt={ele.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default One;
