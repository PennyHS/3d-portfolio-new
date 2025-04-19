import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { myProjects } from '../constants';
import CanvasLoader from "./Loader";
import { DemoComputer } from './canvas';
import SwipeArrows from './SwipeArrows'; // Import the new component
import right_arrow from "../assets/right-arrow.png";
import left_arrow from "../assets/left-arrow.png";

import { motion } from 'framer-motion';

const projectCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [hasUserSwiped, setHasUserSwiped] = useState(false); // Track if user has swiped
  const sectionRef = useRef(null);
  
  // Navigation function for both buttons and swipe
  const handleNavigation = (direction) => {
    setHasUserSwiped(true); // User has navigated, no need to show swipe hint anymore
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };
  
  // GSAP animation for text elements when project changes
  useGSAP(() => {
    gsap.fromTo(`.animatedText`, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' }
    );
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  // Touch swipe detection
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      isSwiping = true;
    };
    
    const handleTouchMove = (e) => {
      if (!isSwiping) return;
      touchEndX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      if (!isSwiping) return;
      
      const swipeDistance = touchStartX - touchEndX;
      
      // Only register as a swipe if the movement is significant
      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
          // Swiped left, go to next
          handleNavigation('next');
        } else {
          // Swiped right, go to previous
          handleNavigation('previous');
        }
      }
      
      // Reset values
      touchStartX = 0;
      touchEndX = 0;
      isSwiping = false;
    };
    
    // Attach swipe handlers to the section
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('touchstart', handleTouchStart, { passive: true });
      section.addEventListener('touchmove', handleTouchMove, { passive: true });
      section.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Cleanup
    return () => {
      if (section) {
        section.removeEventListener('touchstart', handleTouchStart);
        section.removeEventListener('touchmove', handleTouchMove);
        section.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <section id="projects-section" ref={sectionRef} className="relative w-full h-screen">   
      {/* Title section */}
      <motion.div variants={textVariant()} className="text-center">
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>

      {/* Projects content */}
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        {/* Left panel - Project info */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-8 px-4 sm:py-10 sm:px-5 shadow-2xl shadow-black-200 min-h-[500px] md:h-[600px] rounded-xl">
          {/* Background image container */}
          <div className="absolute inset-0 z-0">
            <img 
              src={currentProject.spotlight} 
              alt="background" 
              className="w-full h-full object-cover rounded-xl" 
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 rounded-xl"></div>
          </div>
          
          {/* Content container */}
          <div className="relative z-10 flex flex-col h-full justify-start w-full px-4 md:px-0 py-6 md:py-0">
            {/* Title and description */}
            <div className="flex flex-col gap-3 text-white -mt-4">
              <h3 className="text-white text-3xl font-semibold animatedText">
                {currentProject.name}
              </h3>
              <div className="animatedText prose prose-lg text-gray-500 max-w-none">
                {currentProject.desc}
                <br />
                <br />
                {currentProject.subdesc}
              </div>
       
            </div>

            {/* Technology tags */}
            <div className="flex items-center justify-start flex-wrap gap-3 mt-8 md:mt-10 mb-6">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo bg-gray-800 bg-opacity-50 p-2 rounded-md backdrop-blur-sm flex flex-col items-center justify-center w-16">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img 
                      src={tag.icon} 
                      alt={tag.name} 
                      className="w-8 h-8 object-contain max-w-full" 
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs text-center block mt-1 text-gray-300">{tag.name}</span>
                </div>
              ))}
            </div>        
          </div>
          
          
{/* Navigation controls with improved mobile and desktop support */}
<div className="flex justify-between items-center absolute bottom-4 left-4 right-4 z-[100] relative">
  {/* SwipeArrows will only appear on mobile */}
  <SwipeArrows />
  
  <button 
    onClick={() => handleNavigation('previous')}
    className="arrow-btn h-12 w-12 flex items-center justify-center bg-black bg-opacity-70 rounded-full"
    aria-label="Previous project"
    type="button"
  >
    <img src={left_arrow} alt="Previous" className="w-5 h-5 hidden lg:block" />
  </button>
  
  <div className="text-white text-sm bg-black bg-opacity-70 px-3 py-1 rounded-full backdrop-blur-sm">
    {selectedProjectIndex + 1} / {projectCount}
  </div>
  
  <button 
    onClick={() => handleNavigation('next')}
    className="arrow-btn h-12 w-12 flex items-center justify-center bg-black bg-opacity-70 rounded-full"
    aria-label="Next project" 
    type="button"
  >
    <img src={right_arrow} alt="Next" className="w-5 h-5 hidden lg:block" />
  </button>
</div>
        </div>
        
        {/* Right panel - 3D model display */}
        <div className="border border-black-300 bg-[#10021a] rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, 0, 0]}>
                 <DemoComputer video={currentProject.video} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls 
              maxPolarAngle={Math.PI / 2} 
              enableZoom={false}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Projects, 'projects');