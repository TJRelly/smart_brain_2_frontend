import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

const LoginForm = ({ login }) => {
    const navigateTo = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const [isDemoLogin, setIsDemoLogin] = useState(false);

    console.debug(
        "LoginForm",
        "login=",
        typeof login,
        "formData=",
        formData,
        "formErrors",
        formErrors
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /companies.
     */
    async function handleSubmit(evt) {
        if (evt) evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigateTo("/detect");
        } else {
            setFormErrors(result.errors);
        }
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    // useEffect to trigger submission after demo credentials are set
    useEffect(() => {
        if (isDemoLogin) {
            handleSubmit();
            setIsDemoLogin(false); // reset demo login flag after submission
        }
    }, [formData, isDemoLogin]);

    // Login using demo account
    async function handleDemo(evt) {
        if (evt) evt.preventDefault();
        setFormData({ username: "test", password: "password1" });
        setIsDemoLogin(true); // set flag to trigger form submission after state update
    }

    return (
        <form
            onSubmit={handleSubmit}
            id="login-form"
            className="bg-grey-lighter flex flex-col sm:w-full h-auto m-auto"
        >
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="px-6 py-8 rounded shadow-xl text-black w-full backdrop-blur-sm">
                    <h1 className="text-white mb-0 text-3xl text-center">
                        {" "}
                        - Smart Brain -{" "}
                    </h1>
                    <h1 className="text-white mb-8 mt-0 text-2xl text-center">
                        Face-Detection App
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
                        className="white w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white focus:outline-none my-2 tracking-wide"
                    >
                        Log in
                    </button>

                    <p className="development">- or -</p>

                    <button
                        onClick={handleDemo}
                        type="button"
                        className="demo-btn my-2 white w-full text-center py-3 rounded tracking-wide"
                    >
                        Demo Account Log in
                    </button>
                </div>

                <div className="text-grey-dark mt-6 bg-white px-4 py-5 rounded-lg shadow-md text-black w-full">
                    Don't have an account?
                    <Link to="/register">
                        <button className="text-lg no-underline border-b text-blue-700 transition duration-200 hover:border-blue-700 text-blue ml-2 ease-in">
                            Create one!
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;

