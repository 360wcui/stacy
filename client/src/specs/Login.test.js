import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Login from '../components/Login.js'; // Adjust the import path based on your file structure
import axios from 'axios';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../variables";
import Register from "../components/Register";
import React from "react";

// Mock axios and useHistory
jest.mock('axios');

const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Component', () => {


    it('should render the login form correctly', () => {
        renderWithRouter(<Login />);
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("button").textContent).toMatch(/Login/i);
    });

                // it('should call axios and redirect on successful login', async () => {
                    //     // Mock a successful API response
                    //     axios.post.mockResolvedValueOnce({ data: 'Login successful' });
                    //
                    //     render(<Login />);
                    //
                    //     fireEvent.change(screen.getByPlaceholderText('Username'), {
                    //         target: { value: 'testuser' },
                    //     });
                    //     fireEvent.change(screen.getByPlaceholderText('Password'), {
                    //         target: { value: 'password123' },
                    //     });
                    //
                    //     fireEvent.click(screen.getByText('Login'));
                    //
                    //     await waitFor(() => {
                    //         expect(axios.post).toHaveBeenCalledWith(`${SERVER_URL}/api/users/login`, {
                    //             username: 'testuser',
                    //             password: 'password123',
                    //         });
                    //         expect(history.push).toHaveBeenCalledWith('/inventory');
                    //     });
                    // });
                    //
                    // it('should show an alert if login fails', async () => {
                    //     // Mock a failed API response
                    //     axios.post.mockResolvedValueOnce({ data: 'Invalid credentials' });
                    //
                    //     render(<Login />);
                    //
                    //     fireEvent.change(screen.getByPlaceholderText('Username'), {
                    //         target: { value: 'wronguser' },
                    //     });
                    //     fireEvent.change(screen.getByPlaceholderText('Password'), {
                    //         target: { value: 'wrongpassword' },
                    //     });
                    //
                    //     fireEvent.click(screen.getByText('Login'));
                    //
                    //     await waitFor(() => {
                    //         expect(axios.post).toHaveBeenCalledWith(`${SERVER_URL}/api/users/login`, {
                    //             username: 'wronguser',
                    //             password: 'wrongpassword',
                    //         });
                    //         expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
                    //     });
                    // });
                    //
                    // it('should handle errors gracefully', async () => {
                    //     // Mock an error from the API
                    //     axios.post.mockRejectedValueOnce(new Error('Network error'));
                    //
                    //     jest.spyOn(console, 'error').mockImplementation(() => {});
                    //     render(<Login />);
                    //
                    //     fireEvent.change(screen.getByPlaceholderText('Username'), {
                    //         target: { value: 'testuser' },
                    //     });
                    //     fireEvent.change(screen.getByPlaceholderText('Password'), {
                    //         target: { value: 'password123' },
                    //     });
                    //
                    //     fireEvent.click(screen.getByText('Login'));
                    //
                    //     await waitFor(() => {
                    //         expect(console.error).toHaveBeenCalledWith(new Error('Network error'));
                    //     });
                    // });
                });