import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SmartApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${SmartApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/login`, data, "post");
        return res.token;
    }

    /** Signup for site. */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save user profile page. */

    static async updateProfile(id, data) {
        let res = await this.request(`users/${id}`, data, "patch");
        return res.user;
    }

    /** Delete user profile page. */

    static async deleteProfile(id, data) {
        let res = await this.request(`users/${id}`, data, "delete");
        
        return res.message;
    }

    /** Handle image from form. */

    static async handleImage(data) {
        let res = await this.request(`image/imageurl`, data, "post");
        return res;
    }

    /** Increment Entries. */

    static async incrementEntries(data) {
        let res = await this.request(`image/increment`, data, "patch");
        return res.user;
    }
}

export default SmartApi;
