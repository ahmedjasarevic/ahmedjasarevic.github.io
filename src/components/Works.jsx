import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github, website } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, tags, image, source_code_link, website_link }) => {
  return (
      <Tilt options={{ max: 45, scale: 1, speed: 450 }} className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full">
        <div className="relative w-full h-[230px]">
          <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            {/* Show GitHub icon if source_code_link is provided */}
            {source_code_link && (
              <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" onClick={() => window.open(source_code_link, "_blank")}>
                <img src={github} className="w-1/2 h-1/2 object-contain" />
              </div>
            )}
            {/* Show Website icon if website_link is provided */}
            {website_link && (
              <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" onClick={() => window.open(website_link, "_blank")}>
                <img src={website} className="w-1/2 h-1/2 object-contain" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>#{tag.name}</p>
          ))}
        </div>
      </Tilt>
  
  );
};

const Works = () => {
  return (
    <>
      
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects </h2>
    

      <div className="w-full flex">
        <p
          variants={fadeIn("", "", 0.1, 1)} className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Explore a range of projects showcasing my skills in web development and design. From dynamic web applications to interactive user interfaces, each project demonstrates my commitment to delivering innovative and functional solutions tailored to meet specific needs. Dive into the details and see how I've turned concepts into impactful digital experiences.
        </p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
