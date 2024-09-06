import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound'; // Adjust the import path as needed

describe('NotFound', () => {
    test('renders the NotFound component', () => {
        render(<NotFound />);

        // Check if the container is in the document
        const messageElement = screen.getByText(/Sorry... Page Not Found./i);
        expect(messageElement).toBeTruthy();
    });
});

