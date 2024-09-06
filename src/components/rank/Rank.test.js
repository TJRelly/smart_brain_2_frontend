import React from 'react';
import { render, screen } from '@testing-library/react';
import Rank from './Rank'; // Adjust the import path as needed

describe('Rank', () => {
    test('renders the Rank component with name and entries', () => {
        const name = 'John Doe';
        const entries = 5;

        // Render the Rank component with props
        render(<Rank name={name} entries={entries} />);

        // Check if the name is displayed correctly
        const nameElement = screen.getByText(`Hello, ${name}`);
        expect(nameElement).toBeInTheDocument(); // This is part of @testing-library/react

        // Check if the entries count is displayed correctly
        const entriesElement = screen.getByText(`${entries}`);
        expect(entriesElement).toBeInTheDocument(); // This is part of @testing-library/react
    });
});

