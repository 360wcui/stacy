import axios from "axios";
import { jwtDecode } from 'jwt-decode';
export const getWithAuth = async (url) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
    console.log(token)

    const decoded = jwtDecode(token);

    console.log("decoded", decoded);  // Output the decoded payload
    const headers = token ? {
        Authorization: `Bearer ${token}`,
    } : {};
    try {
        const response = await axios.get(url,{ headers });
        return response; // Return the data from the response
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const deleteWithAuth = async (url) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
    const headers = token ? {
        Authorization: `Bearer ${token}`,
    } : {};
    try {
        const response = await axios.delete(url, { headers });
        return response; // Return the data from the response
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error; // Rethrow error for further handling if necessary
    }
};


export const updateItemWithAuth = async (url, newItem) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
    const headers = token ? {
        Authorization: `Bearer ${token}`,
    } : {};
    try {
        const response = await axios.put(url, newItem, { headers } );
        return response; // Return the data from the response
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error; // Rethrow error for further handling if necessary
    }
};

export const addNewItemWithAuth = async (url, newItem) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage

    try {
        const response = await axios.put(url, newItem , {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        });
        return response; // Return the data from the response
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error; // Rethrow error for further handling if necessary
    }
};