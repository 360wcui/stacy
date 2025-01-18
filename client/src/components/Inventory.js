import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import MyNewItemModal from "./MyNewItemModal";
import {SERVER_URL} from "../variables";


const Inventory = () => {
    const [items, setItems] = useState([]);
    const [newItemModal, setNewItemModal] = useState(false);

    useEffect(() => {
        axios.get(`${SERVER_URL}/api/item/user/1`)
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    const addNewItem = () => {
        setNewItemModal(true)
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
            <MyNewItemModal modal={newItemModal} setModal={setNewItemModal}/>

        </div>
    );
}

export default Inventory;