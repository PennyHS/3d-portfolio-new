import React, { useEffect, useState, useRef } from 'react';

const StarBackgound = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const starRefs = useRef([]);
  const nebulaRefs = useRef([]);

  // Generate random stars with varying properties
  const generateStars = () => {
    const stars = [];
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 5000);
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        id: `star-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        color: getRandomStarColor(),
        depth: Math.random() * 5 + 1,
        pulse: Math.random() > 0.7,
        pulseSpeed: Math.random() * 4 + 1,
        twinkle: Math.random() > 0.8,
        twinkleSpeed: Math.random() * 3 + 0.5,
      });
    }
    return stars;
  };
  
  // Generate colorful nebula backgrounds
  const generateNebulae = () => {
    const nebulae = [];
    const nebulaCount = 3;
    
    for (let i = 0; i < nebulaCount; i++) {
      nebulae.push({
        id: `nebula-${i}`,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        width: Math.random() * 30 + 20,
        height: Math.random() * 30 + 20,
        color: getRandomNebulaColor(),
        opacity: Math.random() * 0.1 + 0.05,
        depth: Math.random() * 3 + 3,
      });
    }
    return nebulae;
  };
  
  // Get random colors for stars
  const getRandomStarColor = () => {
    const colors = [
      '#ffffff', // white
      '#fffacd', // cream
      '#d6e7ff', // light blue
      '#ffe9d1', // light orange
      '#bfceff', // pale blue
      '#ffc0c0', // light pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Get random colors for nebulae
  const getRandomNebulaColor = () => {
    const colors = [
      'rgba(60, 60, 150, 1)',  // blue
      'rgba(150, 60, 120, 1)',  // purple
      'rgba(150, 80, 60, 1)',   // red
      'rgba(60, 150, 120, 1)',  // teal
      'rgba(120, 60, 150, 1)',  // violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Initialize stars and nebulae
  const [stars, setStars] = useState([]);
  const [nebulae, setNebulae] = useState([]);
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
      setStars(generateStars());
      setNebulae(generateNebulae());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Apply parallax effect
  useEffect(() => {
    if (starRefs.current.length === 0) return;
    
    // Update star positions based on mouse
    stars.forEach((star, i) => {
      const el = starRefs.current[i];
      if (!el) return;
      
      const parallaxX = mousePosition.x * 20 / star.depth;
      const parallaxY = mousePosition.y * 20 / star.depth;
      
      el.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
    });
    
    // Update nebula positions based on mouse
    nebulae.forEach((nebula, i) => {
      const el = nebulaRefs.current[i];
      if (!el) return;
      
      const parallaxX = mousePosition.x * 10 / nebula.depth;
      const parallaxY = mousePosition.y * 10 / nebula.depth;
      
      el.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
    });
  }, [mousePosition, stars, nebulae]);
  
  // Apply animation cycles
  useEffect(() => {
    const animateStars = () => {
      stars.forEach((star, i) => {
        const el = starRefs.current[i];
        if (!el) return;
        
        if (star.pulse) {
          el.style.animation = `pulse ${star.pulseSpeed}s infinite alternate`;
        }
        
        if (star.twinkle) {
          el.style.animation = `twinkle ${star.twinkleSpeed}s infinite alternate`;
        }
      });
    };
    
    animateStars();
  }, [stars]);
  
  // Store references to all star and nebula elements
  useEffect(() => {
    starRefs.current = starRefs.current.slice(0, stars.length);
    nebulaRefs.current = nebulaRefs.current.slice(0, nebulae.length);
  }, [stars, nebulae]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-black" 
      style={{ zIndex: -1000 }}
    >
      {/* Nebulae layer */}
      {nebulae.map((nebula, i) => (
        <div
          key={nebula.id}
          ref={el => nebulaRefs.current[i] = el}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.width}%`,
            height: `${nebula.height}%`,
            backgroundColor: nebula.color,
            opacity: nebula.opacity,
            transition: 'transform 0.3s ease-out',
          }}
        />
      ))}
      
      {/* Stars layer */}
      {stars.map((star, i) => (
        <div
          key={star.id}
          ref={el => starRefs.current[i] = el}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      ))}
      
      {/* Occasional shooting stars */}
      <div className="absolute w-full h-full">
        <div className="shooting-star"></div>
        <div className="shooting-star delayed"></div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        .shooting-star {
          position: absolute;
          width: 150px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
          animation: shooting 7s linear infinite;
          animation-delay: 2s;
          opacity: 0;
          transform: rotate(-45deg);
        }
        
        .shooting-star.delayed {
          animation-delay: 5s;
          top: 40%;
          left: 60%;
        }
        
        @keyframes shooting {
          0% {
            transform: translateX(-100px) translateY(100px) rotate(-45deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          20% {
            transform: translateX(calc(100vw + 100px)) translateY(calc(-100vh - 100px)) rotate(-45deg);
            opacity: 0;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(calc(-100vh - 100px)) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StarBackgound;