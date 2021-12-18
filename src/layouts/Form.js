import { makeStyles } from '@mui/styles';
import React from 'react'

const userStyles = makeStyles(theme=>({
    root: {
        '& .MuiFormControl-root' : {
            width: '90%'  ,
            margin: '5px'
        }
    }
}))
export default function Form(props){
    const classes = userStyles();
    const { children, ...other } = props;

    return(
        <form className={classes.root} noValidate autoComplete="off" {...other}>
            {children}
        </form> 
    )
}