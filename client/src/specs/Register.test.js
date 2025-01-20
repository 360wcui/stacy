import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Register from "../components/Register";

jest.mock("axios");

const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Register Component", () => {

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

    it("renders the form with all fields and button", () => {
        renderWithRouter(<Register />);

        // Check for form fields
        expect(screen.getByTestId("firstName")).toBeInTheDocument();
        expect(screen.getByTestId("lastName")).toBeInTheDocument();
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("confirmedPassword")).toBeInTheDocument();

        // Check for register button
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    // it("shows error when passwords do not match", () => {
    //     renderWithRouter(<Register />);
    //
    //     // Fill out form fields
    //     fireEvent.change(screen.getByRole("textbox", { name: /Password/i }), {
    //         target: { value: "password123" },
    //     });
    //     fireEvent.change(screen.getByTestId("confirmedPassword"), {
    //         target: { value: "differentPassword" },
    //     });
    //
    //     // Submit the form
    //     fireEvent.click(screen.getByRole("button", { name: /register/i }));
    //
    //     // Check for error message
    //     expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    // });
    //
    // it("submits the form and navigates on success", async () => {
    //     const mockNavigate = jest.fn();
    //     jest.mock("react-router-dom", () => ({
    //         ...jest.requireActual("react-router-dom"),
    //         useNavigate: () => mockNavigate,
    //     }));
    //
    //     // Mock API response
    //     axios.post.mockResolvedValueOnce({ status: 201 });
    //
    //     renderWithRouter(<Register />);
    //
    //     // Fill out form fields
    //     fireEvent.change(screen.getByLabelText("First Name"), {
    //         target: { value: "John" },
    //     });
    //     fireEvent.change(screen.getByLabelText("Last Name"), {
    //         target: { value: "Doe" },
    //     });
    //     fireEvent.change(screen.getByLabelText("Username"), {
    //         target: { value: "johndoe" },
    //     });
    //     fireEvent.change(screen.getByLabelText("Password"), {
    //         target: { value: "password123" },
    //     });
    //     fireEvent.change(screen.getByLabelText("Confirm Password"), {
    //         target: { value: "password123" },
    //     });
    //
    //     // Submit the form
    //     fireEvent.click(screen.getByRole("button", { name: /register/i }));
    //
    //     // Wait for navigation to occur
    //     await waitFor(() => {
    //         expect(mockNavigate).toHaveBeenCalledWith("/success");
    //     });
    // });
    //
    // it("shows error message on API failure", async () => {
    //     // Mock API failure
    //     axios.post.mockRejectedValueOnce(new Error("Registration failed"));
    //
    //     renderWithRouter(<Register />);
    //
    //     // Fill out form fields
    //     fireEvent.change(screen.getByLabelText("First Name"), {
    //         target: { value: "John" },
    //     });
    //     fireEvent.change(screen.getByLabelText("Last Name"), {
    //         target: { value: "Doe" },
    //     });
    //     fireEvent.change(screen.getByLabelText("Username"), {
    //         target: { value: "johndoe" },
    //     });
    //     fireEvent.change(screen.getByLabelText("Password"), {
    //         target: { value: "password123" },
    //     });
    //     fireEvent.change(screen.getByLabelText("Confirm Password"), {
    //         target: { value: "password123" },
    //     });
    //
    //     // Submit the form
    //     fireEvent.click(screen.getByRole("button", { name: /register/i }));
    //
    //     // Wait for the error message
    //     await waitFor(() => {
    //         expect(screen.getByText("Something wrong during user registration")).toBeInTheDocument();
    //     });
    // });
});