import React from 'react'
import { List, ListItem, ListItemSecondaryAction, ListItemText, Paper, IconButton, ButtonGroup, Button, makeStyles } from '@material-ui/core';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { roundTo2DecimalPoint } from '../../utils'

const useStyles = makeStyles(theme => ({
    paperRoot: {
        margin: '15px 0px',
        '&:hover':{
            cursor: 'pointer'
        },
        '&:hover $deleteButton':{
            display: 'block'
        }
    },
    buttonGroup: {
        backgroundColor: '#e3e3e3',
        borderRadius: 8,
        '& .MuiButtonBase-root': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)':{
            fontSize: '1.2em',
            color: '#000'
        }
    },
    deleteButton: {
        display: 'none',
        '& .MuiButtonBase-root': {
            color: '#e81719'
        }
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fonstSize: '1.2em',
        margin: '0px 10px'
    }
}))

export default function OrderedFooditems(props) {

    const classes = useStyles();
    const { values, setValues } = props;
    let orderedFooditems = values.orderDetails;

    const updateQuantity = (idx, value) => {
        let x = { ...values };        
        if(x.orderDetails[idx].quantity + value > 0){
            x.orderDetails[idx].quantity += value;
            setValues({ ...x });
        }
    }

    const removeFoodItem = (index, id) => {
        let x = {...values};
        x.orderDetails = x.orderDetails.filter((_, i) => i != index);
        if(id != 0)
            x.deletedOrderItemsIds += id + ','
        setValues({ ...x })
    }

    return (
        <List>
            {orderedFooditems.length == 0 ?
                <ListItem>
                    <ListItemText 
                    primary="Please select food items"
                    primaryTypographyProps={{
                        style:{
                            textAlign: 'center',
                            fontStyle: 'italic'
                        }
                    }}
                    />

                </ListItem>
                : orderedFooditems.map((item, idx) => (
                    <Paper 
                    className={classes.paperRoot}
                    key={idx}>
                        <ListItem>
                            <ListItemText
                            primary={item.foodItemName}
                            primaryTypographyProps={{
                                component: 'h1',
                                style: {
                                    fontWeight: '500',
                                    fontSize: '1.2em'
                                }
                            }}
                            secondary = {
                                <>
                                <ButtonGroup 
                                className={classes.buttonGroup}
                                size="small">
                                    <Button
                                    onClick={e => updateQuantity(idx, -1)}
                                    >-</Button>
                                    <Button disabled>
                                        {item.quantity}
                                    </Button>
                                    <Button 
                                    onClick={e => updateQuantity(idx, 1)}
                                    >+</Button>
                                </ButtonGroup>
                                <span 
                                className={classes.totalPerItem}> 
                                    {'$' + roundTo2DecimalPoint(item.quantity * item.foodItemPrice)}
                                </span>
                                </>
                            }
                            secondaryTypographyProps = {{
                                component: 'div',
                            }}
                            />
                       
                            <ListItemSecondaryAction
                            className={classes.deleteButton}>
                                <IconButton
                                disableRipple
                                onClick= {e => removeFoodItem(idx, item.orderDetailId)}
                                >
                                    <DeleteTwoToneIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                ))
            }

        </List>
    )
}
