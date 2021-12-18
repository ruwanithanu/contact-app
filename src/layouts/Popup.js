import React from 'react'
import { Dialog, DialogContent, DialogTitle, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

export default function Popup(props) {

    const { title, childern, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup} maxWidth="md" >

        <DialogTitle>
            <div style={{ display: 'flex' }}>
                <Typography variant="h6" component="div" style={{ flexGrow: 1}}>
                    {title}
                </Typography>
                <IconButton onClick={()=> { setOpenPopup(false) }}>
                    <CloseIcon />
                </IconButton>
            </div>
        </DialogTitle>

        <DialogContent dividers>
            {childern}
        </DialogContent>

    </Dialog>
    )
}
