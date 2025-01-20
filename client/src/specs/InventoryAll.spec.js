import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import InventoryAll from "../components/InventoryAll";

jest.mock('axios'); // Mock axios

describe('Inventory All Component', () => {

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
                <InventoryAll/>
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
                <InventoryAll/>
            </Router>
        );

        // Assert the presence of the title and link
        expect(screen.getByText('Item Name')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Quantity')).toBeInTheDocument();
        expect(screen.getByText('User ID')).toBeInTheDocument();
        expect(screen.getByText('#')).toBeInTheDocument();
        expect(screen.queryByText('Add New')).toBeNull();
    });


});
