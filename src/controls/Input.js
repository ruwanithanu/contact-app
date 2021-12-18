import { TextField } from '@mui/material'
import React from 'react'

export default function Input(props) {
    const { name, label, value, variant, onChange, error = null, ...other } = props;

    return (
        <TextField 
            variant = {variant || "outlined"}
            label = {label}
            name = {name}
            value = {value}
            onChange = {onChange}
            size="Normal" 
            {...other}
            {...(error && {error: true, helperText: error })}
        />

        
    )
}
