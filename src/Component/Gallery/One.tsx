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
        link1: "https://maxtech-delta.vercel.app/",
        link2: "https://github.com/277pawan/Maxtech",
      },
      {
        id: 2,
        height: 350,
        img: SpaceInvaderImage,
        title: "Space Invader",
        description:
          "This is a Spaceinvader Game made by HTML5 element (canvas) totally manipulated with Javascript with sound effect and different kind of animation (a race for scoring more and more).",
        link1: "https://277pawan.github.io/Spaceinvaders/",
        link2: "https://github.com/277pawan/Spaceinvaders",
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
        link1: "https://www.npmjs.com/package/react-form-toaster",
        link2: "https://github.com/277pawan/form-builder",
      },
      {
        id: 5,
        height: 300,
        img: BankistImage,
        title: "Bankist Website",
        description:
          "Experience a mini virtual ATM where you can transfer money to friends, take loans, check your balance, and manage your account—all stored securely using local storage. No database required, just simple and seamless transactions! Credentials are 277pawan and 1111",
        link1: "https://277pawan.github.io/Bankist/",
        link2: "https://github.com/277pawan/Bankist",
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
        link1: "https://277pawan.github.io/Shine-waves/",
        link2: "https://github.com/277pawan/Shine-Waves",
      },

      {
        id: 7,
        height: 350,
        img: geoLocationImage,
        title: "GeoLocation Tracker!",
        description:
          " Track your workouts in real-time with our Geolocation Tracker! Whether you're running or cycling, visualize your routes on an interactive Google Map with precise pinpoints of your activity. Stay motivated and monitor your progress effortlessly!",
        link1: "https://277pawan.github.io/Geolocation-tracker/",
        link2: "https://github.com/277pawan/Geolocation-tracker",
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
    <div className="w-full center relative h-auto overflow-hidden">
      <motion.div
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full min-h-screen flex-col gap-10"
      >
        <motion.div
          className="w-full gap-2 block md:flex items-start justify-center p-4"
          layout
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {items.map((column) => (
            <motion.div
              className={cn(
                "w-full md:w-1/3 flex flex-col items-center justify-center gap-4 my-4 md:my-0",
              )}
              key={column.id}
              layout
              animate={{
                opacity: activeItem !== null ? 0 : 1,
                display: activeItem !== null ? "none" : "",
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
              className="w-full h-full md:h-[80%] py-4 px-4 md:px-16 flex items-center justify-center gap-10 flex-col overflow-hidden"
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
                  className="w-full rounded object-cover h-full"
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
                      target="_blank"
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
                      View Site
                    </a>
                    <a
                      href={activeItem.link2}
                      className="px-4 py-2 bg-white text-black rounded-full flex items-center gap-2 hover:bg-white/90 transition-all"
                      target="_blank"
                    >
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z"
                            fill="#0F0F0F"
                          ></path>{" "}
                          <path
                            d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z"
                            fill="#0F0F0F"
                          ></path>{" "}
                        </g>
                      </svg>{" "}
                      Github
                    </a>
                  </div>
                </motion.div>
              </motion.div>
              {/* Scrollable carousel */}
              <motion.div
                className="flex h-1/4 flex-row gap-4 mt-4 justify-start items-center overflow-auto w-full pb-4 px-2"
                style={{
                  scrollBehavior: "smooth",
                  WebkitOverflowScrolling: "touch",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
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
              </motion.div>{" "}
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
        "rounded-2xl border-2 border-gray-700 cursor-pointer relative w-full",
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
        className="w-full rounded-2xl object-cover h-full"
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
