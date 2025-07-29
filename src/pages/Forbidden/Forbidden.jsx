import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div className="container min-h-screen flex flex-col items-center justify-center  text-center px-4 my-0.5 rounded-xl">
            <FaLock className="text-6xl text-amber-200 text-error mb-4" />
            <h1 className="text-4xl font-bold text-error text-white">403 - Forbidden</h1>
            <p className="text-lg text-gray-300 mt-2 max-w-md">
                Sorry, you do not have permission to access this page. Please contact an administrator if you believe this is a mistake.
            </p>

            <Link to="/" className="mt-6">
                <button className="btn btn-primary text-black">Go to Home</button>
            </Link>
        </div>
    );
};

export default Forbidden;