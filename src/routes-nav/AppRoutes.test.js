import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import UserContext from "../auth/UserContext";  // Import UserContext to mock it

// Mock components
jest.mock("../components/homepage/Homepage", () => () => <div>Homepage</div>);
jest.mock("../auth/LoginForm", () => () => <div>LoginForm</div>);
jest.mock("../auth/RegisterForm", () => () => <div>RegisterForm</div>);
jest.mock("../components/imageLinkForm/ImageLinkForm", () => () => <div>ImageLinkForm</div>);
jest.mock("../auth/ProfileForm", () => () => <div>ProfileForm</div>);
jest.mock("../components/notFound/NotFound", () => () => <div>NotFound</div>);

describe("AppRoutes", () => {
    const mockLogin = jest.fn();
    const mockSignup = jest.fn();
    const mockHandleImage = jest.fn();
    const mockHandleIncrement = jest.fn();
    const mockUpdateUser = jest.fn();
    const mockDeleteUser = jest.fn();

    // Mock a user to simulate authentication
    const mockUser = { username: "testuser" };

    function renderAppRoutes(initialEntries, currentUser = null) {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <UserContext.Provider value={{ currentUser }}>
                    <AppRoutes
                        login={mockLogin}
                        signup={mockSignup}
                        handleImage={mockHandleImage}
                        handleIncrement={mockHandleIncrement}
                        updateUser={mockUpdateUser}
                        deleteUser={mockDeleteUser}
                    />
                </UserContext.Provider>
            </MemoryRouter>
        );
    }

    test("renders the homepage on default route", () => {
        renderAppRoutes(['/']);
        expect(screen.getByText("Homepage")).toBeInTheDocument();
    });

    test("renders login form on /login route", () => {
        renderAppRoutes(['/login']);
        expect(screen.getByText("LoginForm")).toBeInTheDocument();
    });

    test("renders register form on /register route", () => {
        renderAppRoutes(['/register']);
        expect(screen.getByText("RegisterForm")).toBeInTheDocument();
    });

    test("renders image link form on /detect route for authenticated user", () => {
        renderAppRoutes(['/detect'], mockUser);  // Pass mockUser to simulate authenticated user
        expect(screen.getByText("ImageLinkForm")).toBeInTheDocument();
    });

    test("renders profile form on /profile route for authenticated user", () => {
        renderAppRoutes(['/profile'], mockUser);  // Pass mockUser to simulate authenticated user
        expect(screen.getByText("ProfileForm")).toBeInTheDocument();
    });

    test("renders not found page on invalid route", () => {
        renderAppRoutes(['/invalid-route']);
        expect(screen.getByText("NotFound")).toBeInTheDocument();
    });
});

