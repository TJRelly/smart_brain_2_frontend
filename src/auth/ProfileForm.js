import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Alert from "../common/Alert";
// import SmartApi from "../api/api";
import UserContext from "./UserContext";
import useTimedMessage from "../hooks/useTimedMessage";

const ProfileForm = ({ deleteUser, updateUser }) => {
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: currentUser.email,
        username: currentUser.username,
    });

    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useTimedMessage();
    const [isLoading, setIsLoading] = useState(false);

    console.debug(
        "ProfileForm",
        "currentUser=",
        currentUser,
        "formData=",
        formData,
        "formErrors=",
        formErrors,
        "saveConfirmed=",
        saveConfirmed
    );

    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful
     *   - clear previous error messages and password
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {};
        for (let data in formData) {
            if (formData[data].length) profileData[data] = formData[data];
        }

        try {
            setIsLoading(true);
            const result = await updateUser(currentUser.id, profileData);
            if (result.success) {
                setSaveConfirmed(true);
            } else {
                throw new Error(result.errors);
            }
        } catch (err) {
            setIsLoading(false);
            setFormErrors([err.message]);
            return;
        }
        setIsLoading(false);
        setFormData((f) => ({ ...f, password: "" }));
        setFormErrors([]);
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((f) => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
    }

    return (
        <>
            {currentUser.username === "test" ? (
                <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2 py-8 rounded shadow-xl text-black w-full backdrop-blur-sm">
                    <h1 className="text-white text-xl text-center">
                        Sorry, you can not update the test account.
                    </h1>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    id="signin-form"
                    className="bg-grey-lighter flex flex-col sm:w-full h-auto m-auto"
                >
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="px-6 py-8 rounded shadow-xl text-black w-full backdrop-blur-sm">
                            <h1 className="text-white mb-0 text-3xl text-center">
                                {" "}
                                - Hello, {currentUser.username} -{" "}
                            </h1>
                            <h1 className="text-white mb-8 mt-0 text-xl text-center">
                                Update Account
                            </h1>

                            <input
                                onChange={handleChange}
                                value={formData.username}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="username"
                                placeholder="Name"
                                autoComplete="on"
                            />

                            <input
                                onChange={handleChange}
                                value={formData.email}
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email"
                                autoComplete="on"
                            />

                            <input
                                onChange={handleChange}
                                value={formData.password}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password"
                                autoComplete="on"
                            />

                            <button
                                id="submit-form"
                                type="submit"
                                className="white w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white hover:bg-green-dark focus:outline-none my-1"
                            >
                                {isLoading ? (
                                    <>Saving your data . . .</>
                                ) : (
                                    <>Save</>
                                )}
                            </button>
                            <div className="development">
                                <span> - Thank you for trying our app! - </span>
                                <span>
                                    {saveConfirmed ? (
                                        <Alert
                                            type="success"
                                            messages={["Updated successfully."]}
                                        />
                                    ) : null}

                                    {formErrors.length ? (
                                        <Alert
                                            type="danger"
                                            messages={formErrors}
                                        />
                                    ) : null}
                                </span>
                            </div>
                        </div>

                        <div className="text-grey-dark mt-6 m-2 bg-white px-2 py-5 rounded-lg shadow-md text-black w-full">
                            <p>No longer need your account?</p>
                            <Link to="/">
                                <button
                                    onClick={() => deleteUser(currentUser.id)}
                                    className="text-lg no-underline border-b text-red-700 transition duration-200 hover:border-red-700 text-red ml-2 my-2"
                                >
                                    Delete Account
                                </button>
                            </Link>
                            <p>
                                <span className="text-red-600">Warning: </span>
                                Cannot be undone!
                            </p>
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};

export default ProfileForm;
