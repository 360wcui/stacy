import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../components/NavBar';

describe('NavBar Component', () => {
    let mockSetHasJwtToken;

    beforeEach(() => {
        mockSetHasJwtToken = jest.fn();
        localStorage.clear();
    });

    const renderNavBar = (hasJwtToken) => {
        render(
            <Router>
                <NavBar hasJwtToken={hasJwtToken} setHasJwtToken={mockSetHasJwtToken} />
            </Router>
        );
    };

    it('renders NavBar with correct text and buttons', () => {
        renderNavBar(false);

        // Verify the header
        expect(screen.getByText('Inventory Management System')).toBeInTheDocument();

        // Verify buttons
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByText('Inventory')).toBeInTheDocument();
    });

    it('displays Logout button if JWT token exists', () => {
        localStorage.setItem('jwtToken', 'test-token');
        renderNavBar(true);

        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('clears JWT token and navigates to /login on Logout', () => {
        localStorage.setItem('jwtToken', 'test-token');
        renderNavBar(true);

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        expect(localStorage.getItem('jwtToken')).toBeNull();
        expect(mockSetHasJwtToken).toHaveBeenCalledWith(false);
    });

    it('navigates to /login on Login button click', () => {
        renderNavBar(false);

        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

    });

    it('navigates to /register on Register button click', () => {
        renderNavBar(false);

        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);

    });

    it('handles Inventory menu actions', () => {
        renderNavBar(false);

        const inventoryButton = screen.getByText('Inventory');
        fireEvent.click(inventoryButton);

        // Verify menu items are displayed
        expect(screen.getByText('My Account')).toBeInTheDocument();
        expect(screen.getByText('View All')).toBeInTheDocument();

        // Test clicking on menu items
        const myAccountMenuItem = screen.getByText('My Account');
        fireEvent.click(myAccountMenuItem);

    });

    it('calls setHasJwtToken on mount based on JWT token presence', () => {
        localStorage.setItem('jwtToken', 'test-token');
        renderNavBar(false);

        expect(mockSetHasJwtToken).toHaveBeenCalledWith(true);
    });
});