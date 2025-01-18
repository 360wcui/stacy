import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from 'react-modal';
import MyNewItemModal from '../components/MyNewItemModal';
import axios from 'axios';

jest.mock('axios');

describe('MyNewItemModal Component', () => {
    beforeAll(() => {
        // Set up Modal's root element for accessibility
        Modal.setAppElement(document.createElement('div'));
    });

    it('should render modal with form inputs and save functionality', async () => {
        const setModalMock = jest.fn(); // Mock function to handle closing modal
        const mockModalOpen = true; // Open the modal

        // Mock Axios response
        axios.put.mockResolvedValueOnce({ data: { id: 1, name: 'Test Item', description: 'Test Description', quantity: 10 } });

        // Render the component
        render(<MyNewItemModal modal={mockModalOpen} setModal={setModalMock} />);

        // Check if modal content is displayed
        expect(screen.getByText('Please enter the new item information')).toBeInTheDocument();

        // Simulate entering text in the "Item Name" input
        const nameInput = screen.getByLabelText("Item Name");
        fireEvent.change(nameInput, { target: { value: 'Test Item' } });
        expect(nameInput.value).toBe('Test Item');

        // Simulate entering text in the "Description" textarea
        const descriptionTextarea = screen.getByLabelText("Description");
        fireEvent.change(descriptionTextarea, { target: { value: 'Test Description' } });
        expect(descriptionTextarea.value).toBe('Test Description');

        // Simulate entering a number in the "Quantity" input
        const quantityInput = screen.getByLabelText("Quantity");
        fireEvent.change(quantityInput, { target: { value: 10 } });
        expect(quantityInput.value).toBe("10");

        // Simulate clicking the "Save" button
        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        // Wait for the API call to be made and modal to close
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('/api/item/user/1'), {
                name: 'Test Item',
                description: 'Test Description',
                quantity: "10",
            });
            expect(setModalMock).toHaveBeenCalledWith(false); // Modal should be closed
        });
    });
});