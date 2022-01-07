import { IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { createAPIEndpoints, ENDPOINTS } from '../../api'
import SearchTwoToneIcon from '@material-ui/icons/Search';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,        
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#e3e3e3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000'
        },
        '& .MuiButtonBase-root': {
            display: 'block'           
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'           
        }
    } 
})) 


export default function SearchFoodItems(props) {

    const { values, setValues } = props;
    let orderedFooditems = values.orderDetails;

    const [foodItems, setFoodItems] = useState([]);
    const [searchList, setSearchList] = useState([])
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {
        createAPIEndpoints(ENDPOINTS.FOODITEM).fetchAll()
        .then(res => {
            setFoodItems(res.data);
            setSearchList(res.data);
        })
        .catch(err => console.log(err));
    },[])

    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
            && orderedFooditems.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    },[searchKey, orderedFooditems])

    const addFoodItem = foodItem =>{
        let x = {
            orderMasterId: values.orderMasterId,
            orderDetailId: 0,
            foodItemId: foodItem.foodItemId,
            quantity: 1,
            foodItemPrice: foodItem.price,
            foodItemName: foodItem.foodItemName
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }

    return (
        <>
        <Paper className={classes.searchPaper}>
            <InputBase
                className={classes.searchInput}
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
                placeholder="Search food items" />
            <IconButton>
                <SearchTwoToneIcon />
            </IconButton>
        </Paper>
        <List className={classes.listRoot}>
                {searchList.map((item, idx) => (
                    <ListItem onClick={e =>addFoodItem(item)}
                        key={idx}>
                        <ListItemText
                            primary={item.foodItemName}
                            secondary={'$' + item.price} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={e =>addFoodItem(item)} >
                                    <PlusOneIcon />
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                    </ListItem>
                ))}
        </List>
        </>
    )
}
