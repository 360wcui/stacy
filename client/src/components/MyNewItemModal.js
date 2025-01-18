import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "../styles/MyNewItemModal.css";
import {SERVER_URL} from "../variables";

const MyNewItemModal = ({modal, setModal}) => {

    const [formData, setFormData] = useState({name: '', description: '', quantity: 0});


    const handleSave = () => {
        axios.put(`${SERVER_URL}/api/item/user/1`, formData)
            .then(response => {
                // setItem(response.data);
            })
            .catch(error => console.error(error));
        closeModal()
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const closeModal = () => {
        setModal(false)
    }


    return (
        <Modal isOpen={modal}
               styles={customStyles}
               onClick={closeModal}
               ariaHideApp={false}
        >
            <div className="title">
                <p>Please enter the new item information</p>
                <div onClick={() => {
                    closeModal()
                }}>x
                </div>
            </div>

            <div className="new_item_modal">
                <div>
                    <label>Item Name
                        <input type="text" value={formData.name}
                               onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                    </label>
                </div>
                <div>
                    <label>Description
                        <textarea value={formData.description}
                                  onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                    </label>
                </div>
                <div>
                    <label>Quantity
                        <input type="number" value={formData.quantity}
                               onChange={(e) => setFormData({...formData, quantity: e.target.value})}/>
                    </label>
                </div>
                <div className="button_wrapper">
                    <button className="modal_button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </Modal>
    );
}

export default MyNewItemModal;