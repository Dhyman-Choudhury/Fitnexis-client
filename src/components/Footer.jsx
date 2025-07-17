import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { NavLink, } from 'react-router';
import FitnessLogo from './FitnessLogo';



const Footer = () => {
    // const navigate = useNavigate();
    // const { user } = use(AuthContext);

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
                to="/features"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                All Trainer
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/classes"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                All Classes
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                Dashboard
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/community"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                Community
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `flex items-center py-2 rounded-md transition-colors duration-300 lg:px-4 text-gray-100 ${isActive ? 'bg-blue-300 text-white font-semibold' : 'hover:text-gray-300'}`
                }
            >
                User Profile
            </NavLink>
        </li>
    </>;


    return (
        <footer className="bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 text-gray-300 py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

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
                    <ul className="space-y-2 text-sm">
                        {links}
                    </ul>
                </div>

                {/* Social Icons */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">Follow Us</h2>
                    <div className="flex items-center gap-4 mt-2 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition"><FaInstagram /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition"><FaLinkedin /></a>
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