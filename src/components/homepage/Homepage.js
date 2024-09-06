import "./Homepage";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../auth/UserContext";

const Homepage = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="container max-w-2xl mx-auto mt-24 flex-1 flex flex-col items-center justify-center px-8 py-8 rounded shadow-xl text-black w-full backdrop-blur-sm">
            <h1 className="text-white text-3xl text-center">
                Welcome to Smart Brain Face Detection
            </h1>
            <Link
                className="white w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white focus:outline-none my-2 tracking-wide demo-btn"
                to={currentUser ? "/detect" : "/login"}
            >
                <button>Get Started</button>
            </Link>
        </div>
    );
};

export default Homepage;
