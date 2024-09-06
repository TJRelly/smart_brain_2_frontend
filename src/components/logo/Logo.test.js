import { render, screen } from '@testing-library/react';
import Logo from './Logo'; // Adjust the import path as needed

describe('Logo', () => {
    test('renders the Logo component with an image inside Tilt', () => {
        // Render the Logo component
        render(<Logo />);

        // Check if the image with alt text 'brain' is rendered
        const imgElement = screen.getByAltText('brain');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'brain.png');
    });
});


