import {render, screen} from '@testing-library/react';
import App from '../App';
import React from "react";

describe("Test App Component", () => {
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

    it('renders learn react link', () => {
        render(<App/>);
        const linkElement = screen.getByText(/Inventory Management System/i);
        expect(linkElement).toBeInTheDocument();
    });
});
