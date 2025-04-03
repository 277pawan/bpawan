import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    // Add resize event listener to update height on window resize
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 40%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl w-full mx-auto py-12 md:pt-8 md:pb-0 px-4 md:px-8 lg:px-10 flex flex-col justify-center items-center">
        <h2 className="text-lg md:text-4xl mb-4 text-center text-white dark:text-white max-w-full uppercase tracking-[0.5rem] font-bold">
          Experience
        </h2>
        <hr
          style={{
            height: "5px",
            width: "80px",
            backgroundColor: "#7843e9",
            borderRadius: "10px",
          }}
        ></hr>
        <p
          className=" text-center text-white text-sm md:text-xl mt-2 max-w-full"
          style={{ fontFamily: "itim" }}
        >
          I&apos;ve been working on Rubico for the past 1.5 years. Here&apos;s a
          timeline of my journey.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row pt-10 md:pt-32">
            <div className="sticky flex items-center top-20 md:top-40 self-start z-40 w-full md:w-auto md:max-w-sm">
              <div className="relative flex items-center">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gray-700 dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white ">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="relative pl-16 md:pl-20 pr-4 md:pr-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Timeline line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;

