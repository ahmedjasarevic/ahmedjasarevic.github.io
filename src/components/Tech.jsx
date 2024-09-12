import { SectionWrapper } from '../hoc'
import { technologies } from '../constants'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from "../utils/motion"
import { styles } from '../styles'
import { MdCircle } from "react-icons/md"
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Tech = () => {
  useEffect(() => {
    technologies.forEach((_, techIndex) => {
      gsap.fromTo(
        `.tech-content-${techIndex}`,
        { x: techIndex % 2 === 0 ? 400 : -400 },
        {
          x: techIndex % 2 === 0 ? -400 : 400,   
          ease: "power2.out",  
          scrollTrigger: {
            trigger: `.tech-row-${techIndex}`,   
            start: "top bottom",
            end: "bottom top",
            scrub: 3,  
          },
        }
      );
    });
  }, []);
  

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I use</p>
        <h2 className={styles.sectionHeadText}>Technologies</h2>
      </motion.div>
      {technologies.map((technology, techIndex) => (
        <div key={techIndex} className={`tech-row tech-row-${techIndex} mb-8 flex items-center justify-center gap-4 text-slate-700 overflow-hidden`}>
          {Array.from({ length: 15 }, (_, spanIndex) => (
            <div key={spanIndex} className='flex items-center gap-2'>
              <div className={`tech-content tech-content-${techIndex} flex items-center gap-2`}>
                {/* Technology name */}
                <span className={`tech-name text-3xl sm:text-8xl font-extrabold uppercase tracking-tighter`}
                      style={{ color: spanIndex === 7 && technology.color ? technology.color : "inherit" }}>
                  {technology.name}
                </span>
                {/* MdCircle Icon */}
                <span className='text-xl sm:3xl'>
                  <MdCircle />
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default SectionWrapper(Tech, "tech");
