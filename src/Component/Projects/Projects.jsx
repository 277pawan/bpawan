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
          <a target="_blank" href="https://cure-ten.vercel.app/">
            {" "}
            <button className="headerbutton">Case Study</button>
          </a>
        </div>
      </div>
      <div className="projectbox2">
        <div className="project2">
          <img className="proj1" src={proj2} alt="project1"></img>
        </div>
        <div className="project2desc">
          <div className="project2title">Sk template.</div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "400",
              marginTop: "10px",
              marginBottom: "30px",
              padding: "10px",
            }}
          >
            Sktemplate website is based on ecommerce which contains some
            templates based on Html ,Css ,Javascript and react and it allows to
            downloading the templates option on the bases of subscription plan
            created by using stripe integration , Google authentication using
            Firebase ,Reactjs ,HTML5 element(Canvas).
          </div>
          <a href="https://skplate.vercel.app/" target="_blank">
            {" "}
            <button className="headerbutton">Case Study</button>
          </a>
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
          <a href="https://277pawan.github.io/Bankist/" target="_blank">
            {" "}
            <button className="headerbutton">Case Study</button>
          </a>
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
          <a href="https://bdictionary.netlify.app/" target="_blank">
            {" "}
            <button className="headerbutton">Case Study</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Projects;
