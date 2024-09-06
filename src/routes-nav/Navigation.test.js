import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation"; // Adjust the path to where Navigation is located
import UserContext from "../auth/UserContext"; // Import UserContext for mocking

const mockLogout = jest.fn();

// Mock brain image since it may cause issues in test environments
jest.mock("../components/logo/brain.png", () => "brain.png");

describe("Navigation component", () => {
    function renderNavigation(currentUser = null) {
        return render(
            <MemoryRouter>
                <UserContext.Provider value={{ currentUser }}>
                    <Navigation logout={mockLogout} />
                </UserContext.Provider>
            </MemoryRouter>
        );
    }

    test("renders log in and sign up buttons when no user is logged in", () => {
        renderNavigation();

        expect(screen.getByText("Log in")).toBeInTheDocument();
        expect(screen.getByText("Sign up")).toBeInTheDocument();
        expect(screen.queryByText("log out")).not.toBeInTheDocument(); // Should not show log out
    });

    test("renders detect, profile, and log out links when a user is logged in", () => {
        const mockUser = { username: "testuser" };
        renderNavigation(mockUser);

        expect(screen.getByText("detect")).toBeInTheDocument();
        expect(screen.getByText("profile")).toBeInTheDocument();
        expect(screen.getByText("log out")).toBeInTheDocument();
        expect(screen.queryByText("Log in")).not.toBeInTheDocument(); // Should not show log in
        expect(screen.queryByText("Sign up")).not.toBeInTheDocument(); // Should not show sign up
    });

    test("calls logout when log out link is clicked", () => {
        const mockUser = { username: "testuser" };
        renderNavigation(mockUser);

        const logoutLink = screen.getByText("log out");
        logoutLink.click();

        expect(mockLogout).toHaveBeenCalled();
    });
});
