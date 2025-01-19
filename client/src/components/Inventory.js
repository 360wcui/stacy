import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from "../variables";
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import {
    Alert,
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Snackbar,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import axiosWithToken from "../axiosWithToken";
import {Link} from "react-router-dom";


const Inventory = () => {
    const [items, setItems] = useState([]);
    const [newItemModal, setNewItemModal] = useState(false);
    const [user, setUser] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const [filterText, setFilterText] = useState("")

    const [page, setPage] = useState(0);  // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(5);  // Number of rows per page

    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [newItem, setNewItem] = useState({
        id: null,
        name: '',
        description: '',
        quantity: 0,
        userId: 0,
    })

    const [editItem, setEditItem] = useState({
        id: null,
        name: '',
        description: '',
        quantity: 0,
        userId: 0
    })

    const handleClickOpenEdit = (item) => {
        setEditItem(item)
        setOpenEdit(true)
    }

    const handleChange = (e) => {
        setNewItem({...newItem, [e.target.name]: e.target.value});
    }

    const handleChangeEdit = (e) => {
        setEditItem({...editItem, [e.target.name]: e.target.value})
    }

    const handleConfirmOpen = (id) => {
        setDeleteId(id)
        setConfirmOpen(true)
    }
    const handleConfirmClose = (id) => {
        setDeleteId(null)
        setConfirmOpen(false)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const handleDelete = async (itemId) => {
        setSnackbarOpen(true)
        try {
            await axiosWithToken.delete(`${SERVER_URL}/api/item/${itemId}`);
            setItems(items.filter(item => item.id !== itemId));

            setSnackbarMessage("Item was deleted successfully!")
            setSnackbarSeverity("success")

            handleConfirmClose()
        } catch (error) {
            console.log('Error: failed to delete the item: ', error);
            setSnackbarMessage("Error: failed to delete the item")
            setSnackbarSeverity("warning")
        }
    };

    const handleEditItem = async () => {
        setSnackbarOpen(true)
        try {
            const response = await axiosWithToken.put(`${SERVER_URL}/api/item/${editItem.id}`, editItem);
            setItems(items.map(item =>
                item.id === editItem.id ? response.data : item
            ));
            setSnackbarMessage("The item was updated successfully!")
            setSnackbarSeverity("success")
            handleCloseEdit();
        } catch (error) {
            setSnackbarMessage("Failed to update the item")
            setSnackbarSeverity("warning")
            console.log('Error: Failed to update the item.', error)
        }
    }

    const handleAddItem = async () => {
        setSnackbarOpen(true)
        try {
            const response = await axiosWithToken.put(`${SERVER_URL}/api/item/add`,
                newItem);
            setItems([...items, response.data])
            setNewItem({
                name: '',
                description: '',
                quantity: 0
            });
            setSnackbarMessage("An item was added successfully!")
            setSnackbarSeverity("success")
            handleClose();
        } catch (error) {
            setSnackbarMessage("Error: Failed to add an item")
            setSnackbarSeverity("warning")
        }
    }

    const handleFilterChange = (event) => {
        setFilterText(event.target.value)
        setPage(0)
    }

    const filteredItems = items.filter(item =>
        (item.name && item.name.toLowerCase().includes(filterText.toLocaleLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(filterText.toLocaleLowerCase()))
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle change in rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // Reset the table to the first page whenever rows per page changes
    };


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // const userData = jwtDecode(token);
            // setUser(userData);

            axios.get(`${SERVER_URL}/api/item/user/1`)
                .then(response => setItems(response.data))
                .catch(error => console.error(error));
        } else {
            const userId = 1
            axios.get(`${SERVER_URL}/api/item/user/${userId}`)
                .then(response => setItems(response.data))
                .catch(error => console.error(error));
        }

    }, [items]);

    const addNewItem = () => {
        setNewItemModal(true)
    }


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="20%"
            padding="2rem"
            border="ActiveBorder"
            fullWidth
        >
            <Card sx={{width: '80%', padding: '2rem', border: '1px solid black', borderRadius: '8px'}}>
                <TableContainer>
                    <Box display="flex" justifyContent="flex-start">
                        <Button variant='contained' onClick={handleClickOpen}> Add New</Button>
                    </Box>


                    <hr></hr>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}} scope="col">#</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}} scope="col">Item Name</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}} scope="col">Description</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}} scope='col'>Quantity</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}} scope="col">User ID</TableCell>
                                <TableCell scope="col"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredItems && filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                                <TableRow key={item.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell sx={{fontSize: '1.1rem'}} scope="row">{item.id}</TableCell>

                                    <TableCell sx={{fontSize: '1.1rem'}}>{item.name}</TableCell>

                                    <TableCell sx={{fontSize: '1.1rem'}}>{item.description}</TableCell>
                                    <TableCell sx={{fontSize: '1.1rem'}}>{item.quantity}</TableCell>
                                    <TableCell sx={{fontSize: '1.1rem'}}>{item.userId}</TableCell>

                                    <TableCell align='center'>
                                        <IconButton color='secondary' onClick={() => handleConfirmOpen(item.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                        <IconButton color='secondary' onClick={() => handleClickOpenEdit(item)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination sx={{fontSize: '1.1rem'}}
                                     component="div"
                                     count={items != null ? items.length : 0}
                                     page={page}
                                     onPageChange={handleChangePage}
                                     rowsPerPage={rowsPerPage}
                                     onRowsPerPageChange={handleChangeRowsPerPage}
                                     rowsPerPageOptions={[5, 10, 25]}  // Options for rows per page
                    />
                </TableContainer>
                <hr></hr>
            </Card>
            {/* Confirmation Dialog for Deletion */}
            <Dialog open={confirmOpen}
                    style={{width: '600px', maxWidth: '600px'}} // Custom width
                    onClose={handleConfirmClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleDelete(deleteId);
                        }}
                        color="secondary"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal Dialog for Adding New Item */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogContent>

                    <TextField
                        margin="dense"
                        name="name"
                        label="Item Name"
                        type="text"
                        fullWidth
                        value={newItem.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={newItem.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="quantity"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={newItem.quantity}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="userId"
                        label="User ID"
                        type="number"
                        fullWidth
                        value={newItem.userId}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddItem} color="primary" variant="contained">
                        Add Item
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal Dialog for Editing Item */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="id"
                        label="Item ID"
                        type="text"
                        fullWidth
                        disabled
                        value={editItem.id}
                        onChange={handleChangeEdit}
                    />
                    <TextField
                        margin="dense"
                        name="userId"
                        label="User ID"
                        type="text"
                        fullWidth
                        disabled
                        value={editItem.userId}
                        onChange={handleChangeEdit}
                    />
                    <TextField
                        margin="dense"
                        name="name"
                        label="Item Name"
                        type="text"
                        fullWidth
                        value={editItem.name}
                        onChange={handleChangeEdit}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={editItem.description}
                        onChange={handleChangeEdit}
                    />
                    <TextField
                        margin="dense"
                        name="quantity"
                        label="quantity"
                        type="text"
                        fullWidth
                        value={editItem.quantity}
                        onChange={handleChangeEdit}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" onClick={handleEditItem}>
                        Update Item
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    // severity={snackbarSeverity}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '80px'
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Inventory;