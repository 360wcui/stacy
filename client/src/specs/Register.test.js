import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Register from '../components/Register.js';
import {SERVER_URL} from "../variables";

// Mock axios
jest.mock('axios');

describe('Register Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the input fields and register button', () => {
        render(<Register />);

        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Register Now/i)).toBeInTheDocument();
    });

    it('updates state on user input', () => {
        render(<Register />);

        const usernameInput = screen.getByPlaceholderText(/Username/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('password123');
    });

    it('submits form and calls API on button click', async () => {
        window.alert = jest.fn(); // Mock alert

        axios.post.mockResolvedValueOnce({ data: 'Registration successful' });

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/Register Now/i));

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

        expect(axios.post).toHaveBeenCalledWith(`${SERVER_URL}/api/users/register`, {
            username: 'testuser',
            password: 'password123',
        });

        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Registration successful'));
    });

    it('handles API errors gracefully', async () => {
        console.error = jest.fn(); // Suppress error logs in test output

        axios.post.mockRejectedValueOnce(new Error('Registration failed'));

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/Register Now/i));

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

        expect(axios.post).toHaveBeenCalledWith(`${SERVER_URL}/api/users/register`, {
            username: 'testuser',
            password: 'password123',
        });

        await waitFor(() => expect(console.error).toHaveBeenCalled());
    });
});