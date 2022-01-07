import React from 'react'
import { Table as MuiTable, makeStyles } from '@material-ui/core';

const userStyles = makeStyles(() => ({
    table: {
        '& tbody td' : {
            fontweight: '300'
        },
        '& tbody tr:hover' : {
            backgroundColor: '#fffbf2',
            cursonr: 'pointer'
        },
        '& MuiTableCell-root' : {
            boarder: 'none'
        }
    }
}));

export default function Table(props){
    
    const classes = userStyles();    

    return(        
        <MuiTable className={classes.table}>
            {props.children}
        </MuiTable>
    )
}