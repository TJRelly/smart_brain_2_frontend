import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // For routing
import Homepage from './Homepage';
import UserContext from '../../auth/UserContext';

const mockUserContext = (user) => ({
    currentUser: user
});

describe('Homepage', () => {
    test('renders the Homepage component with correct elements', () => {
        // Render the Homepage component with a mock UserContext
        render(
            <Router>
                <UserContext.Provider value={mockUserContext(null)}>
                    <Homepage />
                </UserContext.Provider>
            </Router>
        );

        // Check if the Logo component's image is rendered
        const imgElement = screen.getByAltText('brain');
        expect(imgElement).toBeTruthy();

        // Check if the header text is rendered correctly
        const headerElement = screen.getByText(/Welcome to Smart Brain Face Detection/i);
        expect(headerElement).toBeTruthy();

        // Check if the Get Started button is rendered
        const buttonElement = screen.getByRole('button', { name: /Get Started/i });
        expect(buttonElement).toBeTruthy();

        // Check if the Link component redirects to /login (when currentUser is null)
        const linkElement = screen.getByRole('link');
        expect(linkElement.getAttribute('href')).toBe('/login');
    });

    test('redirects to /detect if currentUser is present', () => {
        // Render the Homepage component with a mock UserContext having a user
        render(
            <Router>
                <UserContext.Provider value={mockUserContext({ name: 'John Doe' })}>
                    <Homepage />
                </UserContext.Provider>
            </Router>
        );

        // Check if the Link component redirects to /detect (when currentUser is present)
        const linkElement = screen.getByRole('link');
        expect(linkElement.getAttribute('href')).toBe('/detect');
    });
});



