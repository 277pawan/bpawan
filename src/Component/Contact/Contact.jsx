import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PandaImage from "../../Assets/profile.png";
import "./Contact.css";

function Contact() {
  const contactRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback);
    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    if (email && message) {
      setIsLoading(true);
      let data = {
        name: name,
        email: email,
        message: message,
      };

      try {
        const res = await fetch("https://port-back-mail.vercel.app/sec", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          setShowSuccess(true);
          setSuccess("Thank you! Your message has been received.");
          setName("");
          setEmail("");
          setMessage("");
          setTimeout(() => {
            setShowSuccess(false);
          }, 4000);
        } else {
          console.log("error:" + res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <section
      id="contact"
      className="min-h-screen bg-[#020202] dark:bg-uuu"
      ref={contactRef}
    >
      <div className="contactbox1">
        <div className="text-lg md:text-4xl mb-4 text-center text-white max-w-full uppercase tracking-[0.5rem] font-bold">
          contact
        </div>
        <hr
          style={{
            height: "5px",
            width: "80px",
            backgroundColor: "#7843e9",
            borderRadius: "10px",
          }}
        ></hr>
        <div className="contactbox1desc">
          Feel free to Contact me by submitting the form below and I will get
          back to you as soon as possible
        </div>
      </div>
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:flex lg:items-center text-white lg:-mx-10">
          <div className="lg:w-1/2 lg:mx-10">
            <h1 className="text-2xl font-semibold capitalize text-white  lg:text-3xl">
              Let's talk
            </h1>
            <form className="mt-12 relative" onSubmit={sendMessage}>
              <div className="-mx-2 md:items-center md:flex">
                <div className="flex-1 px-2">
                  <label className="block mb-1 text-md">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-5 py-3 mt-1 text-gray-300 border-gray-200 rounded-md placeholder-gray-600 bg-gray-900 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    disabled={isLoading}
                  />
                </div>

                <div className="flex-1 px-2 mt-22 md:mt-0">
                  <label className="block mb-1 text-md">Email address</label>
                  <input
                    type="email"
                    placeholder="johndoe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full px-5 py-3 mt-1 text-gray-300 border-gray-200 rounded-md placeholder-gray-600 bg-gray-900 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="w-full mt-2">
                <label className="block mb-1 text-md">Message</label>
                <textarea
                  className="block w-full h-32 px-5 py-3 mt-1 rounded-md md:h-56 placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={isLoading}
                ></textarea>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#7840f1] rounded-md hover:bg-[#7840f1] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Get in touch"
                )}
              </motion.button>

              {/* Success notification */}
              {showSuccess && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                  <p className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {success}
                  </p>
                </div>
              )}
            </form>
          </div>

          <div className="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
            <img
              className="hidden object-cover border-white border-4 mx-auto rounded-full lg:block shrink-0 w-96 h-96"
              src={PandaImage}
              alt="Contact Person"
            />

            <div className="mt-6 space-y-4 md:mt-8">
              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span className="mx-2 text-white w-72">
                  Kotdwara, Pauri Garhwal, Uttrakhand 246149
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <span className="mx-2 text-white truncate w-72">
                  +91 9068509220
                </span>
              </p>

              <p className="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="mx-2 text-white truncate w-72">
                  bpawan277@gmail.com
                </span>
              </p>
            </div>

            <div className="mt-4 w-80 md:mt-8">
              <h3 className="text-white">Follow me</h3>

              <div className="flex mt-4 -mx-1.5">
                {/* LinkedIn Icon */}
                <a
                  className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                  href="https://www.linkedin.com/in/pawan-bisht-a943161b9"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7.2 9.6001H4V19.2001H7.2V9.6001Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                {/* GitHub Icon */}
                <a
                  className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
                  href="https://github.com/277pawan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-6 h-8 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0.297C5.373 0.297 0 5.67 0 12.297C0 17.576 3.438 22.16 8.207 23.677C8.807 23.787 9 23.415 9 23.1V20.855C5.672 21.572 5.004 19.435 5.004 19.435C4.463 18.052 3.682 17.683 3.682 17.683C2.633 16.933 3.757 16.948 3.757 16.948C4.907 17.022 5.496 18.14 5.496 18.14C6.533 19.89 8.221 19.428 8.875 19.175C8.985 18.408 9.298 17.873 9.644 17.567C7.02 17.26 4.285 16.191 4.285 11.75C4.285 10.5 4.72 9.46 5.46 8.685C5.345 8.38 4.975 7.093 5.565 5.43C5.565 5.43 6.53 5.097 8.999 6.697C9.95 6.428 10.95 6.297 11.955 6.297C12.96 6.297 13.96 6.428 14.911 6.697C17.38 5.097 18.345 5.43 18.345 5.43C18.935 7.093 18.565 8.38 18.45 8.685C19.19 9.46 19.625 10.5 19.625 11.75C19.625 16.205 16.885 17.255 14.255 17.552C14.705 17.935 15.08 18.715 15.08 19.84V23.1C15.08 23.415 15.273 23.787 15.873 23.677C20.642 22.16 24.08 17.576 24.08 12.297C24 5.67 18.627 0.297 12 0.297Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
