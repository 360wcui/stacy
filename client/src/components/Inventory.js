import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'


const Inventory = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('/api/items/user/1')
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    const addNewItem = () => {

    }

    const handleDelete = (e, index) => {

    }

    return (
        <div>
            <h1>Inventory</h1>
            <p>Welcome to your inventory page!</p>
            <Table striped bordered hover data-testid="table" data-testid="test-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {items &&
                    items.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td><img alt="delete-button" data-testid="delete-button-icon" className="delete_icon" src="delete_button.png"
                                     onClick={(e) => handleDelete(e, index)}/></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <button className="m-3 btn btn-sm btn-danger"
                onClick={addNewItem}
            >
                Add New Item
            </button>

        </div>
    );
}

export default Inventory;