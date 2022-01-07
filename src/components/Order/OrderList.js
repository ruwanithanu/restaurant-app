import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { createAPIEndpoints, ENDPOINTS } from '../../api'
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

export default function OrderList(props) {

    const { setOrderId, setorderListVisibility, resetFormControls, setNotify } = props;
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {    
        createAPIEndpoints(ENDPOINTS.ORDER).fetchAll()
        .then(res => {
            setOrderList(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id);
        setorderListVisibility(false);
    }

    const deleteOrder = id => {
        if(window.confirm('Are you sure to delete this record')){
            createAPIEndpoints(ENDPOINTS.ORDER).delete(id)
            .then(res => {
                setorderListVisibility(false);
                setOrderId(0);
                resetFormControls();
                setNotify({ 
                    isOpen: true, 
                    message: "Deleted successfully"
                })
            })
            .catch(err => console.log(err))
        }
    }
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Order No.</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Payed With</TableCell>
                    <TableCell>Grand Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                orderList.map(item => (
                    <TableRow 
                    key={item.orderMasterId}>
                        <TableCell 
                        onClick={e => showForUpdate(item.orderMasterId)}>
                            {item.orderNumber}
                        </TableCell>
                        <TableCell
                        onClick={e => showForUpdate(item.orderMasterId)}>
                            {item.customer.customerName}
                        </TableCell>
                        <TableCell
                        onClick={e => showForUpdate(item.orderMasterId)}>
                            {item.pMethod}
                        </TableCell>
                        <TableCell
                        onClick={e => showForUpdate(item.orderMasterId)}>
                            {item.gTotal}
                        </TableCell>
                        <TableCell
                        onClick={e => showForUpdate(item.orderMasterId)}>
                            <DeleteOutlineTwoToneIcon  
                            onClick={e => deleteOrder(item.orderMasterId)}                          
                            color="secondary"/>
                        </TableCell>
                    </TableRow>
                    ))        
            }                    
            </TableBody>
        </Table>
    )
}
