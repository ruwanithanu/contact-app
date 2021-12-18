import React, { useState, useEffect } from 'react'
import Form from '../../layouts/Form'
import {Input } from '../../controls'
import { ButtonGroup, Grid, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { apiEndpoints, ENDPOINTS } from '../../api'
import Popup from '../../layouts/Popup'
import VcardList from './VcardList'
import SendIcon from '@mui/icons-material/Send';
import ListIcon from '@mui/icons-material/List';
import RefreshIcon from '@mui/icons-material/Refresh';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';

export default function VcardForm(props) {
  
const { values, setValues, errors, setErrors, handelInputChange, resetFormControls } = props;
const [ tagList, setTagList ] = useState([]);
const [ contactId, setContactId ] = useState(0);
const [ file, setFile ] = useState(null);
const [ contactListVisibility, setContactListVisibility ] = useState(false);
const [ feildDisable, setFeildDisable ] = useState(false);
const NOTECHARLIMIT = 200;

//custom hooks

useEffect(() => {
    apiEndpoints(ENDPOINTS.TAG).fetchAll()
    .then(res => {
        let tagList = res.data.map(item => ({
            id : item.tagId,
            title : item.tagName
        }));
        setTagList(tagList);
        setValues({
            ...values,
            tagId: tagList[0].id
        })        
    })
    .catch( error => console.log(error))
},[])

useEffect(() => {
    apiEndpoints(ENDPOINTS.CONTACT).fetchById(contactId)
    .then(res => {
        setValues(res.data);
        setFeildDisable(true);
    })
    .catch(error => console.log(error))
},[contactId])

//btn tigger

const handleSubmit = (e) => {
    e.preventDefault();
    
    if(handelValidation()){
        apiEndpoints(ENDPOINTS.CONTACT).create(values)
        .then(res => {
            resetFormControls();
            alert("Contact save successfully");
            //window.location.reload(true)
        })
        .catch(error => console.log(error))
    }
}

const handelFirstName = (e) => {
    handelInputChange(e);
    setValues({
        ...values,
        firstName: e.target.value,
        contactName : e.target.value + ' ' + values.lastName
    })
}

const handelLastName = (e) => {
    handelInputChange(e);
    setValues({
        ...values,
        lastName: e.target.value,
        contactName : values.firstName + ' ' + e.target.value 
    })
}

const handleNote = e => {
    handelInputChange(e);
    setValues({ 
        ...values, 
        note: e.target.value 
    });
  };

const handleReset = () => {
    resetFormControls();
    setFeildDisable();
}

const handlePopup = () => {
    setContactListVisibility(true);
}

const handelFileChange = e => {
    setFile(e.target.files[0]);
}

const handleUpload = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    apiEndpoints(ENDPOINTS.VCF).upload(data)
    .then(res => {
        alert('vcard imported successfully');
    })
    .catch(error => console.log(error))    
}

const handelValidation = () => {
    let err = {};
    
    err.firstName = values.firstName !== '' ? "" : "* required";
    err.lastName = values.lastName !== '' ? "" : "* required";

    const emailFormat = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    err.emailPrimary = values.emailPrimary !== '' && values.emailPrimary.match(emailFormat) ? "" : "* required or invalid";
    err.emailSecondary = values.emailSecondary === '' ? "" : (values.emailSecondary.match(emailFormat) ? "" : "invalid");

    //const phoneNoFormat = /^\d{10}$/;
    const phoneNoFormat = /(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    err.phoneMobileNo = values.phoneMobileNo !== '' && values.phoneMobileNo.match(phoneNoFormat) ? "" : "* required or invalid";
    err.phoneOfficeNo = values.phoneOfficeNo === '' ? "" : (values.phoneOfficeNo.match(phoneNoFormat) ? "" : "invalid");
    err.phoneHomeNo = values.phoneHomeNo === '' ? "" : (values.phoneHomeNo.match(phoneNoFormat) ? "" : "invalid");

    const webUrlFormat = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    err.webSiteUrl = values.webSiteUrl === '' ? "" : (values.webSiteUrl.match(webUrlFormat) ? "" : "invalid");

    setErrors({...err});
    return Object.values(err).every(x => x==="");
}

    return (
        <>
        <Form onSubmit = {handleSubmit}>
             <Grid container spacing={1}>

                <Grid item xs={12}>

                    <input
                        hidden
                        name = "contactId"
                        onChange={handelInputChange}
                        value = {values.contactId}
                    />

                    <Input
                        disabled
                        label="Hello"
                        name = "contactName"
                        onChange={handelInputChange}
                        value = {values.contactName}
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={6}>
                    <Input 
                        disabled={feildDisable}       
                        label="First Name *" 
                        name = "firstName"
                        onChange={handelFirstName}
                        value = {values.firstName}
                        error = {errors.firstName}
                    />                   
                </Grid>

                <Grid item xs={6}>
                    <Input 
                        disabled={feildDisable}       
                        label="Last Name *" 
                        name = "lastName"
                        onChange={handelLastName}
                        value = {values.lastName}
                        error = {errors.lastName}
                    />
                </Grid>

                <Grid item xs={4}>
                    <Input           
                        label="#Mobile No *" 
                        name = "phoneMobileNo"
                        onChange={handelInputChange}
                        value = {values.phoneMobileNo}
                        error = {errors.phoneMobileNo}
                    />
                </Grid>

                <Grid item xs={4}>
                    <Input           
                        label="#Office No" 
                        name = "phoneOfficeNo"
                        onChange={handelInputChange}
                        value = {values.phoneOfficeNo}
                        error = {errors.phoneOfficeNo}
                    />
                </Grid>

                <Grid item xs={4}>
                    <Input           
                        label="#Home No" 
                        name = "phoneHomeNo"
                        onChange={handelInputChange}
                        value = {values.phoneHomeNo}
                        error = {errors.phoneHomeNo}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Input        
                        label="Primary Address *" 
                        name = "addressPrimary"
                        onChange={handelInputChange}
                        value = {values.addressPrimary}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Input            
                       label="Secondary Address" 
                       name = "addressSecondary"
                       onChange={handelInputChange}
                       value = {values.addressSecondary}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Input      
                        label="Primary Email *" 
                        name = "emailPrimary"
                        onChange={handelInputChange}
                        value = {values.emailPrimary}
                        error = {errors.emailPrimary}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Input         
                       label="Secondary Email" 
                       name = "emailSecondary"
                       onChange={handelInputChange}
                       value = {values.emailSecondary}
                       error = {errors.emailSecondary}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Input      
                        label="Web Url" 
                        name = "webSiteUrl"
                        onChange={handelInputChange}
                        value = {values.webSiteUrl}
                        error = {errors.webSiteUrl}
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="tag">Tag * </InputLabel>
                        <Select
                            label="Tag"
                            name="tagId"
                            value={values.tagId}
                            onChange={handelInputChange}
                            >
                             {
                                tagList.map(
                                    item => (<MenuItem key={item.id} value={item.id}> {item.title}</MenuItem>)
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Input
                        label="Note"
                        name = "note"
                        multiline
                        rows={3}
                        inputProps={{
                            maxLength: NOTECHARLIMIT
                        }}
                        value={values.note}
                        onChange={handleNote}
                        helperText={`${values.note?.length ?? 0 }/${NOTECHARLIMIT}`}
                        margin="normal"
                    />
                </Grid> 
                
                <Grid item xs={6}>
                    <ButtonGroup>
                        <Input  size="small" accept="image/*" id="file" multiple type="file" onChange={handelFileChange} />
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleUpload}>
                            <PhotoCamera />
                        </IconButton>
                    </ButtonGroup>                   
                </Grid>
                
                <Grid item xs={2}> 
                </Grid>

                <Grid item xs={4}>
                    <ButtonGroup>
                        <Button size="large" type="submit" endIcon={<SendIcon />}>
                        </Button>
                        <Button size="large" onClick={handleReset} endIcon={<RefreshIcon />}>
                         </Button>
                        <Button size="large" onClick={handlePopup} startIcon={<ListIcon />} >
                        </Button>
                    </ButtonGroup>                    
                </Grid>

             </Grid>
        </Form>

        <Popup
            title="Topo Contacts"
            openPopup={contactListVisibility}
            setOpenPopup={setContactListVisibility}
            childern={<VcardList 
            {...{ 
                setContactId,
                setContactListVisibility,
                resetFormControls
            }}/>}
        >
        </Popup>

    </>

    )
}
