import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import left_arrow from "../assets/left-arrow.png";
import right_arrow from "../assets/right-arrow.png";

const SwipeArrows = () => {
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  
  useEffect(() => {
    // Apply animation on mobile devices and iPads
    const isMobile = window.innerWidth <= 768;
    const isIPad = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Add resize listener to handle orientation changes and window resizing
    const handleResize = () => {
      const currentMobile = window.innerWidth <= 768;
      const currentIPad = window.innerWidth > 768 && window.innerWidth <= 1024;
      
      // Kill existing animations
      gsap.killTweensOf([leftArrowRef.current, rightArrowRef.current]);
      
      // Restart animation if device is mobile or iPad
      if (currentMobile || currentIPad) {
        startAnimation();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Function to start the animation
    const startAnimation = () => {
      // Create animation for the swipe arrows that repeats indefinitely
      const tl = gsap.timeline({ repeat: -1 });
      
      // Animate left arrow
      tl.fromTo(leftArrowRef.current, 
        { x: 0, opacity: 0.7 }, 
        { x: -10, opacity: 0.3, duration: 0.8, ease: 'power2.inOut' }
      );
      
      // Return to starting position
      tl.to(leftArrowRef.current, 
        { x: 0, opacity: 0.7, duration: 0.8, ease: 'power2.inOut' }
      );
      
      // Animate right arrow
      tl.fromTo(rightArrowRef.current, 
        { x: 0, opacity: 0.7 }, 
        { x: 10, opacity: 0.3, duration: 0.8, ease: 'power2.inOut' },
        '-=1.6' // Start at the same time as left arrow
      );
      
      // Return to starting position
      tl.to(rightArrowRef.current, 
        { x: 0, opacity: 0.7, duration: 0.8, ease: 'power2.inOut' },
        '-=0.8'
      );
    };
    
    // Start animation if on mobile or iPad
    if (isMobile || isIPad) {
      startAnimation();
    }
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf([leftArrowRef.current, rightArrowRef.current]);
    };
  }, []);
  
  return (
    <div className="swipe-hint absolute bottom-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 lg:hidden">
      <div className="flex items-center gap-4 bg-black bg-opacity-70 px-4 py-2 rounded-full">
        <div ref={leftArrowRef} className="w-6 h-6">
          <img src={left_arrow} alt="Swipe left" className="w-full h-full" />
        </div>
        <span className="text-white text-xs">Swipe</span>
        <div ref={rightArrowRef} className="w-6 h-6">
          <img src={right_arrow} alt="Swipe right" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default SwipeArrows;