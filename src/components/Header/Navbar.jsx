import React, { useState } from "react";
import FitnessLogo from "../FitnessLogo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/');
        toast.success('You logged out');
      })
      .catch(error => {
        toast(error.message);
      });
  };

  const links = <>
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          ` flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 
          ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/allTrainers"
        className={({ isActive }) =>
          `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 
          ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
        }
      >
        All Trainers
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/allClasses"
        className={({ isActive }) =>
          `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 
          ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
        }
      >
        All Classes
      </NavLink>
    </li>
    {user && (
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 
            ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
          }
        >
          Dashboard
        </NavLink>
      </li>
    )}
    <li>
      <NavLink
        to="/forums"
        className={({ isActive }) =>
          `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 
          ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
        }
      >
        Forums
      </NavLink>
    </li>
  </>;

  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200 bg-gradient-to-r from-[#234652] to-[#3c325d] shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
      <div className="relative mx-auto max-w-full mx-2 md:px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
          role="navigation"
        >
          {/* Brand Logo */}
          <FitnessLogo />

          {/* Mobile Menu Button */}
          <button
            className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${isToggleOpen
                ? " visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0"
                : ""}`}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-expanded={isToggleOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              {/* Menu bars now WHITE */}
              <span className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-white transition-all duration-300"></span>
              <span className="absolute block h-0.5 w-6 transform rounded-full bg-white transition duration-300"></span>
              <span className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-white transition-all duration-300"></span>
            </div>
          </button>

          {/* Nav Links */}
          <ul
            role="menubar"
            aria-label="Select page"
            className={`absolute right-0 top-0 z-[-1]  justify-center items-center overflow-hidden overflow-y-auto overscroll-contain bg-gradient-to-r from-[#234652] to-[#3c325d] px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 
              lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100 
              ${isToggleOpen ? "visible opacity-100 backdrop-blur-sm" : "invisible opacity-0"}`}
          >
            {links}

            {/* Login/Logout inside dropdown only for mobile */}
            <div className="mt-4 lg:hidden">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block btn-primary transition"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block btn-primary transition"
                >
                  Login
                </Link>
              )}
            </div>
          </ul>

          {/* Call to Action Button for DESKTOP only */}
          <div className="ml-2 hidden lg:flex items-center px-6 lg:ml-3 lg:p-0">
            {user ? (
              <div className="flex items-center ml-3">
                {user.photoURL && (
                  <img
                    className="w-16 h-16 object-cover rounded-full"
                    src={user.photoURL}
                    alt=""
                    title={user.displayName}
                  />
                )}
                <Link onClick={handleLogout} className="btn-primary inline-block text-center ml-4">
                  LogOut
                </Link>
              </div>
            ) : (
              <Link to="/login" className="btn-primary inline-block text-center ml-4">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
