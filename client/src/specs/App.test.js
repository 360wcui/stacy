import { render, screen } from '@testing-library/react';
import App from '../App';
import React from "react";

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Inventory Management System/i);
  expect(linkElement).toBeInTheDocument();
});
