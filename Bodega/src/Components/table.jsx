import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'; 

const TableComponent = ({ columns, data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filters, setFilters] = useState({});

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event, field) => {
        setFilters({
            ...filters,
            [field]: event.target.value
        });
    };

    const applyFilters = (data) => {
        let filteredData = [...data];
        Object.keys(filters).forEach(field => {
            if (filters[field]) {
                filteredData = filteredData.filter(row => 
                    row[field] && row[field].toString().toLowerCase().includes(filters[field].toLowerCase())
                );
            }
        });
        return filteredData;
    };

    const filteredData = applyFilters(data);
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
           
            <Box 
                sx={{ 
                    padding: '16px', 
                    backgroundColor: '#fff', 
                    borderRadius: '4px', 
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    marginBottom: '16px'
                }}
            >
                {columns.filter(col => col.filterable).map(col => (
                    <TextField
                        key={col.field}
                        label={`Filter ${col.headerName}`}
                        variant="outlined"
                        size="small"
                        style={{ margin: '8px' }}
                        value={filters[col.field] || ''}
                        onChange={(event) => handleFilterChange(event, col.field)}
                    />
                ))}
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => 
                                col.show !== false && (
                                    <TableCell 
                                        key={col.field} 
                                        align={col.align || 'left'}
                                        style={{ fontWeight: 'bold', backgroundColor: '#C6E7D0' }}
                                    >
                                        {col.headerName}
                                    </TableCell>
                                )
                            )}
                            <TableCell align="right" style={{ fontWeight: 'bold', backgroundColor: '#C6E7D0' }}>
                                Opciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((col) => 
                                    col.show !== false && (
                                        <TableCell key={col.field} align={col.align || 'left'}>
                                            {row[col.field]}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default TableComponent;
