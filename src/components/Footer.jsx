import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { NavLink, } from 'react-router';
import FitnessLogo from './FitnessLogo';
import useAuth from '../hooks/useAuth';



const Footer = () => {
    // const navigate = useNavigate();
    const { user } = useAuth();

    // const handleNavigate = () => {
    //     navigate('/addBlog');
    // };

    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/allTrainers"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                All Trainer
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/allClasses"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                All Classes
            </NavLink>
        </li>
      {
        user &&
          <li>
            <NavLink
                to="/dashboard"
                className= {({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                Dashboard
            </NavLink>
        </li>
      }
        <li>
            <NavLink
                to="/forums"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                Forums
            </NavLink>
        </li>
        
    </>;


    return (
        <footer className="bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-gray-300 py-10">
            <div className=" mx-auto px-2 lg:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Logo and Description */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                      <FitnessLogo></FitnessLogo>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        This website provides insights into your fitness and allows you to book a fitness instructor.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/terms" className="hover:text-cyan-400 transition">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:text-cyan-400 transition">Privacy Policy</a></li>
                        <li><a href="/contact" className="hover:text-cyan-400 transition">Contact Us</a></li>
                        <li><a href="/about" className="hover:text-cyan-400 transition">About Us</a></li>
                    </ul>
                </div>

                {/* Routes */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">Routes</h2>
                    <ul className="space-y-2 text-sm w-24">
                        {links}
                    </ul>
                </div>

                {/* Social Icons */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">Follow Us</h2>
                    <div className="flex items-center gap-4 mt-2 text-2xl">
                        <a href="https://www.facebook.com/dhimana.caudhuri.2025" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><FaFacebook /></a>
                        <a href="https://x.com/Dhyman2029" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition"><FaTwitter /></a>
                        <a href="https://github.com/Dhyman-Choudhury" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/dhyman-ch" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="mt-10 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Tech Explorer. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;