import { render, screen } from '@testing-library/react';
import Inventory from '../components/Inventory'; // Adjust the import path if necessary

describe('Inventory Component', () => {
    it('should render the Inventory page with correct content', () => {
        // Render the Inventory component
        render(<Inventory />);

        // Check if the heading "Inventory" is rendered
        expect(screen.getByText('Inventory')).toBeInTheDocument();

        // Check if the welcome message is rendered
        expect(screen.getByText('Welcome to your inventory page!')).toBeInTheDocument();
    });
});
