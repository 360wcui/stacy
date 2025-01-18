import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import Inventory from '../components/Inventory';
import {SERVER_URL} from "../variables";

jest.mock('axios'); // Mock axios

describe('Inventory Component', () => {

    it('should render the Inventory page with correct content', async () => {
        // Mock API response
        axios.get.mockResolvedValueOnce({
            data: [
                {id: 1, name: 'Item 1', description: 'Description for Item 1'},
                {id: 2, name: 'Item 2', description: 'Description for Item 2'},
            ],
        });

        // Render the Inventory component
        render(
            <Router>
                <Inventory/>
            </Router>
        );

        // Check if the heading "Inventory" is rendered
        expect(screen.getByText('Inventory')).toBeInTheDocument();

        // Check if the welcome message is rendered
        expect(screen.getByText('Welcome to your inventory page!')).toBeInTheDocument();

        // Wait for the items to be rendered
        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });
    });

    it('renders the inventory header and add new item link', () => {
        // Mock axios to return an empty array
        axios.get.mockResolvedValueOnce({data: []});

        render(
            <Router>
                <Inventory/>
            </Router>
        );

        // Assert the presence of the title and link
        expect(screen.getByText('Inventory')).toBeInTheDocument();
        expect(screen.getByText('Add New Item')).toBeInTheDocument();
    });

    it('fetches and displays items from API', async () => {
        // Mock API response
        const mockItems = [
            {id: 1, name: 'Item 1', description: 'This is a test description for Item 1'},
            {
                id: 2,
                name: 'Item 2',
                description: 'Another test description that is longer than 100 characters.  it is so long and you should not see the full description.  Instead, you are going to see the ... .'
            },
        ];
        axios.get.mockResolvedValueOnce({data: mockItems});


        render(
            <Router>
                <Inventory/>
            </Router>
        );

        // Wait for the items to be displayed
        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
            expect(screen.getByText(/This is a test description for Item 1/i)).toBeInTheDocument();

            const itemElement = screen.getByTestId("test-table");

            expect(itemElement.querySelectorAll("tr").length).toBe(3);
        });


    });

    it('handles API errors gracefully', async () => {
        // Mock API error

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        axios.get.mockRejectedValue(new Error('Network error'));

         // act(() => {
            render(
                <Router>
                    <Inventory/>
                </Router>
            );

        // Ensure the component renders correctly even on error
        // expect(screen.getByText('Your Inventory')).toBeInTheDocument();
        // expect(screen.getByText('Add New Item')).toBeInTheDocument();

            // Verify error is logged (optional if you have additional handling)
            await waitFor(() => {

                expect(consoleErrorSpy).toHaveBeenCalled();
            });
        // });
    });
});
