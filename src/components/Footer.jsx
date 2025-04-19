import React from 'react';
import { github, linkedin } from "../assets"; // Ensure the paths are correct

const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
        <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className="flex gap-3 items-center">
  <div className="social-icon w-11 h-11 flex items-center justify-center">
  <a 
    href="https://github.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center justify-center hover:bg-white/90 rounded-full p-1 transition-colors"
  >
    <img src={github} alt="github" className="w-9 h-9 object-contain" />
    </a>
  </div>
  <div className="social-icon w-11 h-11 flex items-center justify-center">
  <a 
    href="https://www.linkedin.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center justify-center hover:bg-white/90 rounded-full p-1 transition-colors"
  >
    <img src={linkedin} alt="linkedin" className="w-9 h-9 object-contain" />
    </a>
  </div>
  <a 
          href="/resume/resume.jpg" 
          download="Resume"
          className="bg-white hover:bg-white/60 text-black px-3 py-2 rounded-md text-sm flex items-center"
        >
          Download CV
        </a>
</div>

      <p className="text-white-500">© Jane Smith</p>
    </footer>
  )
}

export default Footer;