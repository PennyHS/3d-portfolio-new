import React, { useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles"; // Ensure this file exists and exports paddinX
import { navLinks } from "../constants"; // Ensure navLinks is correctly exported
import { logo, menu, close } from "../assets"; // Ensure the paths are correct

const Navbar = () => {
  const [active, setActive] = useState(""); // Define the active state
  const [toggle, setToggle] = useState(false); // State for mobile menu toggle

  return (
    <nav
      className={`${styles.paddinX} w-full flex items-center py-5 fixed top-0 z-20 bg-black/50`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo and Title */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-11 h-11 object-contain" />
          <p className="font-bold text-2xl cursor-pointer flex"
            style={{
            background: 'linear-gradient(90deg, #666666, #b3b3b3, #e6e6e6, #b3b3b3, #666666)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
            }}>
              Jane Smith
          </p>
        </Link>
       

        {/* Desktop Navigation Links */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-neutral-400"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)} // Corrected variable name
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false); // Close the menu on selection
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
