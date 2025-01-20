import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import Inventory from '../components/inventory.js';
import {SERVER_URL} from "../variables";

jest.mock('axios'); // Mock axios

describe('Inventory Component', () => {

    beforeAll(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.warn.mockRestore();
        console.log.mockRestore();
        console.error.mockRestore();
    });

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
        expect(screen.getByText('Item Name')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Quantity')).toBeInTheDocument();
        expect(screen.getByText('User ID')).toBeInTheDocument();
        expect(screen.getByText('#')).toBeInTheDocument();
        expect(screen.getByText('Add New')).toBeInTheDocument();
    });

    it('fetches and displays items from API and test long description', async () => {
        // Mock API response
        const mockItems = [
            {
                id: 2,
                name: 'Long Description Item',
                description: 'Another test description that is longer than 100 characters.  it is so long and you should not see the full description. it is so long and you should not see the full description.  Instead, you are going to see the ...'
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
            expect(screen.getByText('Long Description Item')).toBeInTheDocument();

            // const descriptionElement = screen.getByTestId("description")
            const itemElement = screen.getByTestId("test-table");
            expect(itemElement.querySelectorAll("tr").length).toBe(2);

            const rowElements = itemElement.querySelectorAll("tr")
            expect(rowElements[1].querySelectorAll("td").length).toBe(6)
            expect(rowElements[1].querySelectorAll("td")[2].innerHTML).toBe("Another test description that is longer than 100 characters.  it is so long and you should not see t...")

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
