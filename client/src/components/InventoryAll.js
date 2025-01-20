import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from "../variables";
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import {Box, Card, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


const InventoryAll = () => {
    const [items, setItems] = useState([]);

    const [page, setPage] = useState(0);  // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(5);  // Number of rows per page


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle change in rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // Reset the table to the first page whenever rows per page changes
    };


    useEffect(() => {
        axios.get(`${SERVER_URL}/api/item/user/all`)
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

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
                    <hr></hr>
                    <Table aria-label="simple table" data-testid="test-table">
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
                            {items && items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                                <TableRow key={item.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell sx={{fontSize: '1.1rem'}} scope="row">{item.id}</TableCell>

                                    <TableCell sx={{fontSize: '1.1rem'}}>{item.name}</TableCell>

                                    <TableCell data-testid="description" sx={{maxWidth: '150px', whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.1rem'}}>{item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}</TableCell>
                                    <TableCell sx={{fontSize: '1.1rem'}}>{item.quantity}</TableCell>
                                    <TableCell sx={{fontSize: '1.1rem'}}>{item.userId}</TableCell>

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
        </Box>
    );
}

export default InventoryAll;