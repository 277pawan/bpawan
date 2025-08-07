import React from "react";
import ServiceNow from "../../Assets/Servicenow.png";
import Timeline from "../Timeline/Timeline";
function Experience() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p
            className="text-white text-sm md:text-xl font-normal mb-8"
            style={{ fontFamily: "itim" }}
          >
            Since June 7, 2025, I’ve been working at Predigle as a Software
            Engineer. Predigle is a product-based company where I contribute to
            building scalable applications using micro frontend architecture in
            Angular and backend services in Node.js. I collaborate with a
            skilled team to deliver high-quality, maintainable software
            solutions.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://blog.predigle.com/wp-content/uploads/2023/09/Screenshot-2023-09-25-at-5.55.01-PM-1152x579.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover top h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://media.licdn.com/dms/image/v2/C4E33AQHb7Raot6m_8w/productpage-image_1128_635/productpage-image_1128_635/0/1667971934884/predigle_video_image?e=2147483647&v=beta&t=J08Z5FErNp8AL99_-9HWXj4xk4Cl3AKvZjSbin9dh0I"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://content3.jdmagicbox.com/v2/comp/chennai/i4/044pxx44.xx44.230401040511.v2i4/catalogue/predigle-india-pvt-ltd-guindy-chennai-software-companies-veht7i3zni.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://predigle.com/assets/predigle-website/images/company/about/team.webp"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },

    {
      title: "2024",
      content: (
        <div>
          <p
            className="text-white text-sm md:text-xl font-normal mb-8"
            style={{ fontFamily: "itim" }}
          >
            From February 2024 to June 2025, I worked at Rubico IT as an
            Associate Software Engineer. Rubico is a service-based company where
            I gained experience in both frontend and backend development across
            a range of technologies. During my 1.5 years there, I contributed to
            various client projects, collaborating with cross-functional teams
            to deliver effective and reliable software solutions.{" "}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="data:image/png;base64,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"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-fill h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYMrA7hly-CZzod7TenOL9dz61c8i8dYuOA&s"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmd81UxXrhgMFRE-4lLj-0JLod_tUj80tQqg&s"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRApsefN6LQZ3p-zCJTilphst8blIGKikMLKQ&s"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="text-white text-sm md:text-xl font-normal mb-8">
            Completed a Udemy course on web development in early 2023, gaining
            hands-on experience with modern frameworks. Built personal projects
            showcasing frontend and backend skills in real-world applications.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNYdgtGqG4D9mGjqKiglVzSkGNjSQKhwArQ&s"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="bento template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Service Now",
      content: (
        <div>
          <p className="text-white text-xl md:text-xl font-medium mb-4">
            Certified Application Developer (CAD).
          </p>
          <div className="mb-8" style={{ fontFamily: "itim" }}>
            <div className="flex gap-2 items-center text-white text-sm md:text-xl">
              ✅ Application Development Fundamentals
            </div>
            <div className="flex gap-2 items-center text-white text-sm md:text-xl">
              ✅ ServiceNow Studio & Scripting
            </div>
            <div className="flex gap-2 items-center text-white text-sm md:text-xl">
              ✅ Data Modeling & Database Design
            </div>
            <div className="flex gap-2 items-center text-white text-sm md:text-xl">
              ✅ Security & Access Control
            </div>
            <div className="flex gap-2 items-center text-white text-sm md:text-xl">
              ✅ Automated Workflows
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://cdn.shopaccino.com/igmguru/products/servicenow2-xl-7943179293332_m.jpg?v=530"
              alt="hero template"
              width={500}
              height={800}
              className="rounded-lg object-fill h-20 md:h-44 lg:h-96 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src={ServiceNow}
              alt="feature template"
              width="100%"
              height="100%"
              className="rounded-lg object-fill h-20 md:h-44 lg:h-full w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
export default Experience;
