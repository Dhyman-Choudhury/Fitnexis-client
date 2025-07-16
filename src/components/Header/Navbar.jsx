import React, { useState } from "react";
import FitnessLogo from "../FitnessLogo";
import { NavLink } from "react-router";

function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const links = <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-neutral-500'
          }`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/features"
        className={({ isActive }) =>
          `flex items-center  py-2 transition-colors duration-300 lg:px-4 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-neutral-500'
          }`
        }
      >
       All Trainer
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/features"
        className={({ isActive }) =>
          `flex items-center  py-2 transition-colors duration-300 lg:px-4 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-neutral-500'
          }`
        }
      >
        All Classes
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/features"
        className={({ isActive }) =>
          `flex items-center  py-2 transition-colors duration-300 lg:px-4 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-neutral-500'
          }`
        }
      >
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/features"
        className={({ isActive }) =>
          `flex items-center  py-2 transition-colors duration-300 lg:px-4 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-neutral-500'
          }`
        }
      >
        Community
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/features"
        className={({ isActive }) =>
          `flex items-center  py-2 transition-colors duration-300 lg:px-4 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-neutral-500'
          }`
        }
      >
         User Profile
      </NavLink>
    </li>
  </>

  return (
    <header className="relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
      <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
          role="navigation"
        >
          {/* Brand Logo */}
          <FitnessLogo></FitnessLogo>

          {/* Mobile Menu Button */}
          <button
            className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${isToggleOpen
                ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0"
                : ""}`}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-expanded={isToggleOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"></span>
              <span className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"></span>
              <span className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"></span>
            </div>
          </button>

          {/* Nav Links */}
          <ul
            role="menubar"
            aria-label="Select page"
            className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center items-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto  lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${isToggleOpen ? "visible opacity-100 backdrop-blur-sm" : "invisible opacity-0"
              }`}
          >
            {links}

          </ul>

          {/* Call to Action Button */}
          <div className="ml-2 flex items-center px-6 lg:ml-3 lg:p-0">
            <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-500 px-5 text-sm font-medium text-white shadow-md transition duration-300 hover:bg-neutral-600 focus:bg-neutral-700 focus-visible:outline-none">
              Register
            </button>
            <button className="inline-flex ml-4 h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-500 px-5 text-sm font-medium text-white shadow-md transition duration-300 hover:bg-neutral-600 focus:bg-neutral-700 focus-visible:outline-none">
              Login
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
