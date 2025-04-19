import { motion } from "framer-motion";
import React from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { TypeAnimation } from "react-type-animation";

// Define the keyframe animation in a separate CSS file or use a styled-component approach
// For now, let's add it as a style element in the component
const gradientKeyframes = `
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
`;

const Hero = () => {
  return (
    <section className="relative w-full h-screen">
      {/* Add the keyframe animation as a style element */}
      <style dangerouslySetInnerHTML={{ __html: gradientKeyframes }} />
      
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
        </div>
        <div>
        <h1 className="text-7xl font-mono font-bold ">
          <span className="bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 bg-clip-text text-transparent">
            Welcome to&nbsp;
          </span>
          <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold" style={{ fontFamily: 'fantasy' }}>
            My
          </span>
          <span className="bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 bg-clip-text text-transparent">
            's world
          </span>
        </h1>

          <div style={{ 
            borderLeft: '3px solid #888888', 
            paddingLeft: '1rem', 
            marginTop: '1rem', 
            marginBottom: '1.5rem' 
          }}>
          </div>

          <div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  marginTop: '2rem'
}}>
  <span className={`${styles.heroSubText} text-white-100`} style={{ 
    fontFamily: 'Monospace',
    marginRight: '1rem'
  }}>
    I am a
  </span>
  <TypeAnimation
    sequence={[
      "Automation Enthusiast",
      1000,
      "Web Developer",
      1000,
      "Creative Problem Solver",
      1000,
    ]}
    wrapper="span"
    speed={50}
    repeat={Infinity}
    style={{ 
      fontFamily: 'Monospace', 
      borderBottom: '2px solid #888888',
      padding: '0.25rem 0',
      color: '#fcfcfc',
      fontSize: '1rem'  // Increased font size

    }}
  />
</div>
        </div>
      </div>

      <ComputersCanvas/>

      {/* The connection to About Page*/}
      <div className='relative xs:bottom-60 sm:absolute md:bottom-10 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;