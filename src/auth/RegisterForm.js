import "./LoginForm.css";
import { Link } from "react-router-dom";
// import LoadingScreen from "react-loading-screen"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

const RegisterForm = ({ signup }) => {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    console.debug(
        "SignupForm",
        "signup=",
        typeof signup,
        "formData=",
        formData,
        "formErrors=",
        formErrors
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /detect.
     */

    async function handleSubmit(evt) {
        evt.preventDefault();
        setIsLoading(true)
        let result = await signup(formData);
        if (result.success) {
            navigateTo("/detect");
        } else {
            setIsLoading(false)
            setFormErrors(result.errors);
        }
        setIsLoading(false)
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    return (
        <form
            onSubmit={handleSubmit}
            id="signin-form"
            className="bg-grey-lighter flex flex-col sm:w-full h-auto m-auto"
        >
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="px-6 py-8 rounded shadow-xl text-black w-full backdrop-blur-sm">
                    <h1 className="text-white mb-8 text-3xl text-center">
                        Create Account
                    </h1>

                    <input
                        onChange={handleChange}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Name"
                        autoComplete="on"
                    />

                    <input
                        onChange={handleChange}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        autoComplete="on"
                    />

                    <input
                        onChange={handleChange}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        autoComplete="on"
                    />

                    {formErrors.length ? (
                        <Alert type="danger" messages={formErrors} />
                    ) : null}

                    <button
                        id="submit-form"
                        type="submit"
                        className="white w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white hover:bg-green-dark focus:outline-none my-1"
                    >
                        {isLoading ? <>Signing in . . .</> : <>Sign up</>}
                    </button>
                    <p className="development">
                        {" "}
                        - Thank you for trying our app! -{" "}
                    </p>
                </div>

                <div className="text-grey-dark mt-6 bg-white px-2 py-5 rounded-lg shadow-md text-black w-full">
                    Already have an account?
                    <Link to="/login">
                        <button className="text-lg no-underline border-b text-blue-700 transition duration-200 hover:border-blue-700 text-blue ml-2">
                            Log in.
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
