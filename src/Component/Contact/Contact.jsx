import React, { useEffect, useRef, useState } from "react";
import "./Contact.css";

function Contact() {
  const contactref = useRef(null);
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [success, setsuccess] = useState("");
  const [ssuccess, showsuccess] = useState(false);

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
    observer.observe(contactref.current);
  }, []);

  async function sendmessage(e) {
    e.preventDefault();
    if (email && message) {
      let data = {
        email: email,
        message: message,
      };
      console.log(data);
      try {
        const res = await fetch("https://port-back-mail.vercel.app/sec", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          showsuccess(true);
          setsuccess("Thank you! Your message has been received.");
          setTimeout(() => {
            showsuccess(false);
          }, 4000);
          console.log(res);
        } else {
          console.log("error:" + res);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  const facebookfun = () => {
    console.log("Facebook button clicked");
    const image = `https://mypetstext.com/assets/images/About-image.png`;
    const message =
      "here how all you are doing is everything fine! or not if someone needs any kind of help, please contact me👨‍⚕️";

    const backendurl = `https://port-back-mail.vercel.app/share?imageUrl=${encodeURIComponent(
      image
    )}&text=${encodeURIComponent(message)}`;

    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      backendurl
    )}`;

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="contactcontainer">
        <div className="contactbox1">
          <div className="contactbox1title">contact</div>
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
        <>
          {/* <button onClick={facebookfun}>Facebook</button>{" "} */}
          {/* Correct onClick handler */}
          <form className="contactbox2" onSubmit={sendmessage}>
            <label>Name</label>
            <input type="name" placeholder="Enter your name...."></input>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email...."
              required
            ></input>
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Enter your message...."
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              required
              id="message"
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" ref={contactref} className="headerbutton">
              Message
            </button>
          </form>
        </>
        <div className={`success ${ssuccess ? "visible" : ""}`}>
          {ssuccess ? success : " "}
        </div>
      </div>
    </>
  );
}

export default Contact;
