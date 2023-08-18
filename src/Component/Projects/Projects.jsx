import "./Projects.css";
import proj1 from "../../Assets/Lap1.png";
import proj2 from "../../Assets/Lap2.png";
import proj3 from "../../Assets/Lap3.png";
import proj4 from "../../Assets/Lap4.png";

function Projects() {
  return (
    <div className="projectcontainer">
      <div className="projectbox1">
        <div className="project1title">Projects</div>{" "}
        <hr
          style={{
            height: "5px",
            width: "80px",
            backgroundColor: "#7843e9",
            borderRadius: "10px",
          }}
        ></hr>
        <div className="project1desc">
          Here you will find some of the personal and clients projects that I
          created with each project containing its own URL.
        </div>
      </div>
      <div className="projectbox2">
        <div className="project2">
          <img className="proj1" src={proj1} alt="project1"></img>
        </div>
        <div className="project2desc">
          <div className="project2title">Cure.</div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "400",
              marginTop: "10px",
              marginBottom: "30px",
              padding: "10px",
            }}
          >
            Cure is successfull Open-Source project (e-commerce) which offers a
            various products related to ayurvedha with stripe integration, Log
            in with google authentication, Firestore as a database(add to
            cart,add to wishlist), and with email service. made by using
            Javascript ,Reactjs ,Nodejs, Expressjs, Firebase.
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <a
              target="_blank"
              href="https://github.com/277pawan/bpawan"
              rel="noopener noreferrer"
            >
              {" "}
              <svg
                className="svggithub"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 -2 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="https://cure-ten.vercel.app/"
              rel="noopener noreferrer"
            >
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 -1 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="projectbox2">
        <div className="project2">
          <img className="proj1" src={proj2} alt="project1"></img>
        </div>
        <div className="project2desc">
          <div className="project2title">Space Invader.</div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "400",
              marginTop: "10px",
              marginBottom: "30px",
              padding: "10px",
            }}
          >
            This is a Spaceinvader Game made by HTML5 element (canvas) totally
            manipulated with Javascript with sound effect and different kind of
            animation (a race for scoring more and more).
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <a
              target="_blank"
              href="https://github.com/277pawan/Spaceinvaders"
              rel="noopener noreferrer"
            >
              {" "}
              <svg
                className="svggithub"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 -2 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="https://277pawan.github.io/Spaceinvaders/"
              rel="noopener noreferrer"
            >
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 -1 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>{" "}
      <div className="projectbox2">
        <div className="project2">
          <img className="proj1" src={proj3} alt="project1"></img>
        </div>
        <div className="project2desc">
          <div className="project2title">Bankist.</div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "400",
              marginTop: "10px",
              marginBottom: "30px",
              padding: "10px",
            }}
          >
            A small ATM machine in which you can make the transaction ,check
            your balance, transfer the money ,request for a loan and this all
            thing will be done on the client side only with predefined users.
            you can check it by using the id(277pawan) and pin(1111).
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <a
              target="_blank"
              href="https://github.com/277pawan/Bankist"
              rel="noopener noreferrer"
            >
              {" "}
              <svg
                className="svggithub"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 -2 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="https://277pawan.github.io/Bankist/"
              rel="noopener noreferrer"
            >
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 -1 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>{" "}
      <div className="projectbox2">
        <div className="project2">
          <img className="proj1" src={proj4} alt="project1"></img>
        </div>
        <div className="project2desc">
          <div className="project2title">Dictionary.</div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "400",
              marginTop: "10px",
              marginBottom: "30px",
              padding: "10px",
            }}
          >
            Dictionary contains more then 8lakh words with google language
            translator features in more then 17 languages with phenotics made by
            using HTML, CSS, Javascript.
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <a
              target="_blank"
              href="https://github.com/277pawan/Dictionary."
              rel="noopener noreferrer"
            >
              {" "}
              <svg
                className="svggithub"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 -2 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              target="_blank"
              href="https://bdictionary.netlify.app/"
              rel="noopener noreferrer"
            >
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 -1 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
