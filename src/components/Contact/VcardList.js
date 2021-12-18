import { TableRow, TableCell, TableBody, Paper, InputBase, Box, Typography, CardActions, CardContent } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { apiEndpoints, ENDPOINTS } from '../../api'
import Table from '../../layouts/Table';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

export default function VcardList(props) {

    const { setContactId, setContactListVisibility, resetFormControls } = props;
    const [ contactList, setContactList ] = useState([]);
    const [ filterContactList, setFilterContactList ] = useState([]);
    const [ searchKey, setSearchKey] = useState('');
    const [ uniqueTags, setUniqueTags] = useState([]);

    //custom hooks

    useEffect(() => {
        apiEndpoints(ENDPOINTS.CONTACT).fetchAll()
        .then(res => {
            setContactList(res.data);
            getDistinctTags(res.data);
            setFilterContactList(res.data);
        })
        .catch(error => console.log(error))
    },[])

    
    //btn trigger

    const handleSearch = (e) => {
        setSearchKey(e.target.value);
        let searchList = [...contactList];
        searchList = searchList.filter((item) => {
             return item.contactName.toLowerCase().includes(searchKey.toLowerCase())
             || item.tag.tagName.toLowerCase().includes(searchKey.toLowerCase())
             || item.phoneMobileNo.toLowerCase().includes(searchKey.toLowerCase())
             || item.emailPrimary.toLowerCase().includes(searchKey.toLowerCase())
             || item.webSiteUrl.toLowerCase().includes(searchKey.toLowerCase())
        });        
        setFilterContactList(searchList);
    }
    
    const handelUpdate = id => {
        setContactId(id);
        setContactListVisibility(false);
    }

    const handelDownload = (id, contactName) => {
        setContactId(id);
        apiEndpoints(ENDPOINTS.VCF).download(id)
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', contactName+'.vcf');
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => console.log(error))
    }

    const handelDelete = id => {
        if(window.confirm('Are you sure to delete this contact')){
            apiEndpoints(ENDPOINTS.CONTACT).delete(id)
            .then(res => {
                setContactListVisibility(false);
                resetFormControls();
                alert("Contact deleted successfully");
            })
            .catch(error => console.log(error))
        }
    }

    const getDistinctTags = (contactList) => {
        contactList.map(x => {
            if (uniqueTags.indexOf(x.tag.tagName) === -1) {
                uniqueTags.push(x.tag.tagName);
            }
            setUniqueTags(uniqueTags);
            return uniqueTags;
        })
    }

    return (
       <>
        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
            <InputBase 
                sx={{ ml: 1, flex: 1 }}
                type="search"                
                value={searchKey}
                onChange={handleSearch}
                placeholder="Search contacts"
                autoFocus 
            />
            <IconButton color="primary">
                <SearchIcon />
            </IconButton>
        </Paper>

            <Table>
            <TableBody>
                {
                    uniqueTags.map(itemTag => (
                        <TableRow>
                            <TableCell>
                                {itemTag}
                            </TableCell>

                            <TableCell>
                                {
                                    filterContactList.filter(x => x.tag.tagName.includes(itemTag)).map(item => (
                                        <Box>
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    {item.tag.tagName}
                                                </Typography>
                                                <Typography variant="h5" component="div">
                                                    {item.contactName}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {item.phoneMobileNo} <br />
                                                    {item.emailPrimary} <br />
                                                    {item.webSiteUrl}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <EditIcon  
                                                    onClick={e => handelUpdate(item.contactId)}                          
                                                    color="primary"/>
                                                <DeleteOutlinedIcon  
                                                    onClick={e => handelDelete(item.contactId)}                          
                                                    color="error"/>
                                                <DownloadIcon  
                                                    onClick={e => handelDownload(item.contactId, item.contactName)}                          
                                                    color="primary"/>
                                            </CardActions>
                                        </Box> 
                                    ))
                                }
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
      </>
    )
}
