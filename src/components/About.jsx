import React from 'react';
import { Tilt }  from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { experience, education, stanford, berkeley } from "../assets";
import Profile from '../assets/About_Me_Photo.png';

const About = () => {
  return (
    <>
      {/* Section Title */}
      <motion.div variants={textVariant()} className="text-center">
        <p className={`${styles.sectionSubText} text-center`}>
          Get To Know More
        </p>
        <h2 className={styles.sectionHeadText}>About me</h2>
      </motion.div>

      {/* Main container - removed negative margin */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-10">
        {/* Left Side - Penny Image with Border */}
        <div className="flex-shrink-0 rounded-lg p-5 sm:p-20 flex justify-center">
          <img
            src={Profile}
            alt="pic"
            className="w-full sm:w-[200px] md:w-[450px] h-auto object-contain rounded-2xl"
          />
        </div>

        {/* Right Side - Experience & Education Blocks */}
        <div className="flex flex-col gap-3 sm:gap-5 w-full sm:w-auto mt-3 sm:mt-10">
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-3 sm:gap-10 justify-center w-full">
            {[
              {
                img: experience,
                title: "Experience",
                details: ["2+ Years Technical Team Leadership", "1+ Year Machine Learning Implementation"]
              },
              {
                img: education,
                title: "Education",
                details: [
                  { img: stanford, text: "MS in Computer Science" },
                  { img: berkeley, text: "BS in Software Engineering" }
                ]
              }
            ].map((item, index) => (
              <Tilt key={index} className="w-auto flex-1 min-w-[250px] sm:min-w-[300px] max-w-[300px] sm:max-w-[350px]">
                <motion.div
                  variants={fadeIn("right", "spring", index * 0.5, 0.75)}
                  className="w-full electric-cyan-gradient bg-tertiary p-[1px] rounded-[20px] shadow-card"
                >
                  <div className="bg-tertiary rounded-[20px] py-3 sm:py-5 px-5 sm:px-10 flex flex-col justify-between items-center min-h-[220px] sm:min-h-[300px] h-full">
                    <img src={item.img} alt={item.title} className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] object-contain" />
                    <h3 className="text-white text-[16px] sm:text-[20px] font-bold text-center">{item.title}</h3>
                    
                    <div className="flex flex-col gap-2 sm:gap-4 w-full">
                      {item.details.map((detail, i) =>
                        typeof detail === "string" ? (
                          <p key={i} className="text-secondary text-[14px] sm:text-[17px] text-left">{detail}</p>
                        ) : (
                          <div key={i} className="flex items-center gap-2 sm:gap-3 w-full">
                            <img src={detail.img} alt={detail.text} className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] object-contain" />
                            <p className="text-secondary text-[14px] sm:text-[17px] text-left">{detail.text}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>

          {/* Text Below the Blocks */}
          <div className="mt-3 sm:mt-4 px-4 sm:px-0">
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className="text-secondary text-[17px] max-w-3xl leading-[30px] text-center mx-auto"
            >
               Technology architect and problem-solver with a passion for building efficient digital solutions. 
               My journey in tech spans across development, analytics, and systems optimization, 
               always with a focus on delivering meaningful impact.
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");