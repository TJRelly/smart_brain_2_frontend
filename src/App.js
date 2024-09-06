import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navigation from "./routes-nav/Navigation";
import AppRoutes from "./routes-nav/AppRoutes";
import SmartApi from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import LoadingSpinner from "./common/LoadingSpinner";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "token";

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [entries, setEntries] = useState(null);
    const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    console.debug(
        "App",
        "infoLoaded=",
        infoLoaded,
        "currentUser=",
        currentUser,
        "token=",
        token
    );

    // Load user info from API. Until a user is logged in and they have a token,
    // this should not run. It only needs to re-run when a user logs out, so
    // the value of the token is a dependency for this effect.

    useEffect(
        function loadUserInfo() {
            console.debug("App useEffect loadUserInfo", "token=", token);

            async function getCurrentUser() {
                if (token) {
                    try {
                        let { username } = jwtDecode(token);
                        // put the token on the Api class so it can use it to call the API.
                        SmartApi.token = token;
                        let currentUser = await SmartApi.getCurrentUser(
                            username
                        );
                        setCurrentUser(currentUser);
                        setEntries(currentUser.entries);
                        setInfoLoaded(true); // Set infoLoaded to true only after currentUser is set
                    } catch (err) {
                        console.error("App loadUserInfo: problem loading", err);
                        setCurrentUser(null);
                        setInfoLoaded(true); // Even if there's an error, set infoLoaded to true
                    }
                } else {
                    setInfoLoaded(true); // If no token, set infoLoaded to true immediately
                }
            }

            // set infoLoaded to false while async getCurrentUser runs; once the
            // data is fetched (or even if an error happens!), this will be set back
            // to true to control the spinner.
            getCurrentUser();
        },
        [token]
    );

    /** Handles site-wide signup.
     *
     * Automatically logs them in (set token) upon signup.
     *
     * Make sure you await this function and check its return value!
     */
    async function signup(signupData) {
        try {
            let token = await SmartApi.signup(signupData);
            setToken(token);
            return { success: true };
        } catch (errors) {
            console.error("signup failed", errors);
            return { success: false, errors };
        }
    }

    /** Handles site-wide login.
     *
     * Make sure you await this function and check its return value!
     */
    async function login(loginData) {
        try {
            let token = await SmartApi.login(loginData);
            setToken(token);
            return { success: true };
        } catch (errors) {
            console.error("login failed", errors);
            return { success: false, errors };
        }
    }

    /** Handles site-wide logout. */
    function logout() {
        setCurrentUser(null);
        setToken(null);
    }

    // Delete a user
    async function deleteUser(id) {
        let result = await SmartApi.deleteProfile(id);
        if (result) logout();
    }

    async function handleImage(imageData) {
        try {
            let data = await SmartApi.handleImage(imageData);
            return { data: data };
        } catch (errors) {
            console.error("handle image failed", errors);
            return { success: false, errors };
        }
    }

    async function handleIncrement(id) {
        try {
            await SmartApi.incrementEntries(id);
            return { success: true };
        } catch (errors) {
            console.error("increment failed", errors);
            return { success: false, errors };
        }
    }

    if (!infoLoaded) return <LoadingSpinner loading={infoLoaded} />;

    return (
        <BrowserRouter>
            <UserContext.Provider
                value={{ currentUser, setCurrentUser, entries, setEntries }}
            >
                <div className="App">
                    <Navigation logout={logout} />
                    <AppRoutes
                        signup={signup}
                        login={login}
                        deleteUser={deleteUser}
                        handleImage={handleImage}
                        handleIncrement={handleIncrement}
                    />
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
