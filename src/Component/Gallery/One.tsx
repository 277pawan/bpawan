import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils.js";
import "../Projects/Projects.css";
import geoLocationImage from "../../Assets/geolocation.png";
import BankistImage from "../../Assets/Bankist.png";
import SpaceInvaderImage from "../../Assets/SpaceInvader.png";
import MaxtechImage from "../../Assets/Maxtech.png";
import ShineWavesImage from "../../Assets/Shine-Wave.png";
import FormBuilderImage from "../../Assets/Form-builder.png";
import { Contrast, ContrastIcon } from "lucide-react";
interface Element {
  id: number;
  height: number;
  img: string;
  title: string;
  description: string;
  link1: string;
  link2: string;
}

interface Column {
  id: number;
  elements: Element[];
}

// Enhanced data with titles, descriptions and links
const items: Column[] = [
  {
    id: 1,
    elements: [
      {
        id: 1,
        height: 400,
        img: MaxtechImage,
        title: "MaxTech",
        description:
          "Maxtech is a dynamic, fully animated website packed with cutting-edge frontend functionality. Explore interactive experiences, including crazy fun games like Type Writer and Tic-Tac-Toe. Dive into a seamless blend of creativity and technology!",
        link1: "https://example.com/details",
        link2: "https://example.com/download",
      },
      {
        id: 2,
        height: 350,
        img: SpaceInvaderImage,
        title: "Space Invader",
        description:
          "This is a Spaceinvader Game made by HTML5 element (canvas) totally manipulated with Javascript with sound effect and different kind of animation (a race for scoring more and more).",
        link1: "https://example.com/details",
        link2: "https://example.com/download",
      },
    ],
  },
  {
    id: 2,
    elements: [
      {
        id: 3,
        height: 300,
        img: "https://ground.bossadizenith.me/others/photo-4.jpg",
        title: "Bankist",
        description:
          "A small ATM machine in which you can make the transaction ,check your balance, transfer the money ,request for a loan and this all thing will be done on the client side only with predefined users. you can check it by using the id(277pawan) and pin(1111).",
        link1: "https://example.com/details",
        link2: "https://example.com/download",
      },
      {
        id: 4,
        height: 250,
        img: FormBuilderImage,
        title: "Form-Builder",
        description:
          "React-Form-Toaster is a powerful and flexible library designed for creating dynamic forms in React applications with ease. Users can quickly generate complex forms by simply defining input types, buttons, and other elements without needing to create each element separately. To set up React-Form-Toaster, you can install it via npm or yarn:",
        link1: "https://example.com/details",
        link2: "https://example.com/download",
      },
      {
        id: 5,
        height: 300,
        img: BankistImage,
        title: "Bankist Website",
        description:
          "Experience a mini virtual ATM where you can transfer money to friends, take loans, check your balance, and manage your account—all stored securely using local storage. No database required, just simple and seamless transactions!",
        link1: "https://example.com/details",
        link2: "https://example.com/download",
      },
    ],
  },
  {
    id: 3,
    elements: [
      {
        id: 6,
        height: 400,
        img: ShineWavesImage,
        title: "Shine-Waves",
        description:
          "This 3D shining wave animation offers full customization, allowing you to modify every aspect in real-time. Adjust the amplitude, frequency, colors, and background to create unique visual effects. Experience smooth, dynamic waves with total creative control!",
        link1: "https://example.com/details",
        link2: "https://example.com/download",
      },

      {
        id: 7,
        height: 350,
        img: geoLocationImage,
        title: "GeoLocation Tracker!",
        description:
          " Track your workouts in real-time with our Geolocation Tracker! Whether you're running or cycling, visualize your routes on an interactive Google Map with precise pinpoints of your activity. Stay motivated and monitor your progress effortlessly!",
        link1: "https://example.com/details",
        link2: "https://example.com/download",
      },
    ],
  },
];

const One: React.FC = () => {
  const [activeItem, setActiveItem] = useState<Element | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleItemClick = (ele: Element) => {
    setActiveItem(ele);
  };

  const allElements = items.flatMap((column) => column.elements);

  return (
    <div className="w-full center relative h-full overflow-hidden">
      <motion.div
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full min-h-screen flex-col gap-10"
      >
        <motion.div
          className="w-full gap-2 flex items-start justify-center p-4"
          layout
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {items.map((column) => (
            <motion.div
              className={cn(
                "w-full md:w-1/3 flex flex-col items-center justify-center gap-4",
              )}
              key={column.id}
              layout
              animate={{
                opacity: activeItem !== null ? 0 : 1,
                willChange: "auto",
              }}
            >
              {column.elements.map((ele, index) => (
                <Gallery
                  item={ele}
                  key={index}
                  onClick={() => setActiveItem(ele)}
                  onHover={(id) => setHoveredId(id)}
                  isHovered={hoveredId === ele.id}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, willChange: "auto" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeItem.id}
              className="w-full h-[80%] py-4 px-16 flex items-center justify-center gap-10 flex-col overflow-hidden"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              layout
            >
              <motion.div
                layoutId={`card-${activeItem.id}`}
                className="w-full h-full rounded-3xl cursor-pointer overflow-hidden relative"
                onClick={() => setActiveItem(null)}
              >
                <img
                  src={activeItem.img}
                  alt={activeItem.title}
                  className="w-full object-cover h-full"
                />
                {/* Text overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/0 flex flex-col justify-end p-6 md:p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {activeItem.title}
                  </h2>
                  <p
                    style={{ fontFamily: "itim" }}
                    className="text-sm md:text-base text-white/90 mb-4 max-w-2xl line-clamp-3 md:line-clamp-4"
                  >
                    {activeItem.description}
                  </p>

                  <div className="flex flex-row gap-4 mt-2">
                    <a
                      href={activeItem.link1}
                      className="px-4 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full flex items-center gap-2 transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                      View Details
                    </a>
                    <a
                      href={activeItem.link2}
                      className="px-4 py-2 bg-white text-black rounded-full flex items-center gap-2 hover:bg-white/90 transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download
                    </a>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-row gap-4 justify-center items-center"
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {allElements
                  .filter((ele) => ele.id !== activeItem.id)
                  .map((ele) => (
                    <Gallery
                      key={ele.id}
                      item={ele}
                      onClick={() => handleItemClick(ele)}
                      isSmall
                      onHover={() => {}}
                      isHovered={false}
                    />
                  ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

const Gallery = (props: {
  item: Element;
  onClick: () => void;
  onHover: (id: number | null) => void;
  isHovered: boolean;
  isSmall?: boolean;
}) => {
  const { item, onClick, onHover, isHovered, isSmall } = props;

  return (
    <motion.div
      style={{
        height: isSmall ? 100 : item.height,
        width: isSmall ? 150 : "100%",
      }}
      className={cn(
        "rounded-2xl border-2 border-gray-700 cursor-pointer overflow-hidden relative w-full",
        isSmall ? "flex-shrink-0" : "w-full",
      )}
      layoutId={`card-${item.id}`}
      onClick={onClick}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.img
        src={item.img}
        alt={item.title}
        className="w-full object-cover h-full"
        whileHover={{ scale: 1.05 }}
        transition={{
          duration: 0.3,
        }}
      />

      {/* Hover overlay for gallery mode - only shows on non-small items when hovered */}
      {!isSmall && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/0 p-3 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-sm md:text-base font-bold text-white mb-1">
            {item.title}
          </h3>
          <p
            style={{ fontFamily: "itim" }}
            className="text-sm text-white/80 line-clamp-2"
          >
            {item.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default One;
