import React from 'react'
import { TableContainer, TableHead, Table ,TableCell, TableRow , TableBody, Paper } from '@mui/material';
function Test_Table({data}) {
  return (
    <>
       <TableContainer component={Paper}>
                <h4 style={{ padding: "2px",margin:"10px" }}>Recent Tests</h4>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow sx={{ backgroundColor: '#B22222' }}> 
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Test Id</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Test Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Group</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Sub Group</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Unit Charge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
              <TableRow key={row.testId}>
                <TableCell>{row.testId}</TableCell>
                <TableCell>{row.testName}</TableCell>
                <TableCell>{row.group}</TableCell>
                <TableCell>{row.subGroup}</TableCell>
                <TableCell>{row.unitCharge}</TableCell>
              </TableRow>
            ))}
                    </TableBody>
                </Table>
            </TableContainer>
      
    </>
  )
}

export default Test_Table