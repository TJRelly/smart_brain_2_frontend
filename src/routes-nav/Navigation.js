import brain from "../components/logo/brain.png";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav
            id="navigation"
            className="flex justify-between bg-white border-b-2 border-blue-400 px-4 sm:px-16"
        >
            <section className="flex gap-1 self-center">
                <Link to="/" className="flex">
                    <img src={brain} alt="brain" className="h-14 self-center" />
                    <span className="text-lg sm:text-xl link blue py-4 pointer">
                        Smart Brain
                    </span>
                </Link>
            </section>

            <section className="flex gap-4 self-center">
                <Link
                    to="/login"
                    className="text-sm sm:text-lg link dim blue px-1 sm:px-3 pointer m-auto"
                >
                    Log in
                </Link>
                <Link to="/register">
                    <button className="text-sm sm:text-lg white font-semibold tracking-wide link dim px-6 pointer bg-blue-500 text-white py-2 rounded">
                        Sign up
                    </button>
                </Link>
            </section>
        </nav>
    );
};

export default Navigation;
