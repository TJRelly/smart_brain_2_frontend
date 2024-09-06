import axios from "axios";
import SmartApi from "./SmartApi"; // Adjust the path as needed

// Mock axios
jest.mock("axios");

describe("SmartApi", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock calls
    });

    test("request method makes correct API call", async () => {
        // Arrange
        const endpoint = "test-endpoint";
        const data = { key: "value" };
        const method = "get";
        const response = { data: { result: "success" } };
        axios.mockResolvedValue(response); // Mock resolved value

        // Act
        const result = await SmartApi.request(endpoint, data, method);

        // Assert
        expect(axios).toHaveBeenCalledWith({
            url: `${process.env.REACT_APP_BASE_URL || "http://localhost:3000"}/${endpoint}`,
            method,
            data,
            params: method === "get" ? data : {},
            headers: { Authorization: `Bearer ${SmartApi.token}` },
        });
        expect(result).toEqual(response.data);
    });

    test("request method handles errors correctly", async () => {
        // Arrange
        const endpoint = "test-endpoint";
        const error = {
            response: {
                data: {
                    error: { message: "Error message" }
                }
            }
        };
        axios.mockRejectedValue(error);

        // Act & Assert
        await expect(SmartApi.request(endpoint)).rejects.toEqual(["Error message"]);
    });

    test("getCurrentUser fetches user data", async () => {
        // Arrange
        const username = "testuser";
        const userData = { user: { id: 1, name: "Test User" } };
        axios.mockResolvedValue({ data: userData });

        // Act
        const user = await SmartApi.getCurrentUser(username);

        // Assert
        expect(user).toEqual(userData.user);
        expect(axios).toHaveBeenCalledWith({
            url: `${process.env.REACT_APP_BASE_URL || "http://localhost:3000"}/users/${username}`,
            method: "get",
            data: {},
            params: {},
            headers: { Authorization: `Bearer ${SmartApi.token}` },
        });
    });

    test("login retrieves token", async () => {
        // Arrange
        const credentials = { username: "testuser", password: "testpass" };
        const token = "test-token";
        axios.mockResolvedValue({ data: { token } });

        // Act
        const result = await SmartApi.login(credentials);

        // Assert
        expect(result).toEqual(token);
        expect(axios).toHaveBeenCalledWith({
            url: `${process.env.REACT_APP_BASE_URL || "http://localhost:3000"}/auth/login`,
            method: "post",
            data: credentials,
            params: {},
            headers: { Authorization: `Bearer ${SmartApi.token}` },
        });
    });

    test("signup retrieves token", async () => {
        // Arrange
        const userData = { username: "testuser", password: "testpass" };
        const token = "test-token";
        axios.mockResolvedValue({ data: { token } });

        // Act
        const result = await SmartApi.signup(userData);

        // Assert
        expect(result).toEqual(token);
        expect(axios).toHaveBeenCalledWith({
            url: `${process.env.REACT_APP_BASE_URL || "http://localhost:3000"}/auth/register`,
            method: "post",
            data: userData,
            params: {},
            headers: { Authorization: `Bearer ${SmartApi.token}` },
        });
    });

    test("updateProfile updates user data", async () => {
        // Arrange
        const id = 1;
        const updateData = { name: "Updated User" };
        const updatedUser = { user: { id, name: "Updated User" } };
        axios.mockResolvedValue({ data: updatedUser });

        // Act
        const user = await SmartApi.updateProfile(id, updateData);

        // Assert
        expect(user).toEqual(updatedUser.user);
        expect(axios).toHaveBeenCalledWith({
            url: `${process.env.REACT_APP_BASE_URL || "http://localhost:3000"}/users/${id}`,
            method: "patch",
            data: updateData,
            params: {},
            headers: { Authorization: `Bearer ${SmartApi.token}` },
        });
    });

    test("deleteProfile deletes user profile", async () => {
        // Arrange
        const id = 1;
        const message = "User deleted successfully";
        axios.mockResolvedValue({ data: { message } });

        // Act
        const result = await SmartApi.deleteProfile(id);

        // Assert
        expect(result).toEqual(message);
        expect(axios).toHaveBeenCalledWith({
            url: `${process.env.REACT_APP_BASE_URL || "http://localhost:3000"}/users/${id}`,
            method: "delete",
            data: {},
            params: {},
            headers: { Authorization: `Bearer ${SmartApi.token}` },
        });
    });

    test("handleImage handles image upload", async () => {
        // Arrange
        const imageData = { image: "image-url" };
        const response = { result: "Image processed" };
        axios.mockResolvedValue({ data: response });

        // Act
        const result = await SmartApi.handleImage(imageData);

        // Assert
        expect(result).toEqual(response);
        expect(axios).toHaveBeenCalledWith({
            url: `${process.env.REACT_APP_BASE_URL || "http://localhost:3000"}/image/imageurl`,
            method: "post",
            data: imageData,
            params: {},
            headers: { Authorization: `Bearer ${SmartApi.token}` },
        });
    });

    test("incrementEntries increments entries", async () => {
        // Arrange
        const incrementData = { count: 1 };
        const userData = { user: { id: 1, count: 2 } };
        axios.mockResolvedValue({ data: userData });

        // Act
        const result = await SmartApi.incrementEntries(incrementData);

        // Assert
        expect(result).toEqual(userData.user);
        expect(axios).toHaveBeenCalledWith({
            url: `${process.env.REACT_APP_BASE_URL || "http://localhost:3000"}/image/increment`,
            method: "patch",
            data: incrementData,
            params: {},
            headers: { Authorization: `Bearer ${SmartApi.token}` },
        });
    });
});
