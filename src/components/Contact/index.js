import React from 'react'
import VcardForm from './VcardForm'
import { useForm } from '../../hooks/useForm';


const getDefaultModelObject = () => ({
    "contactId": '',
    "firstName": '',
    "lastName": '', 
    "contactName": '', 
    "phoneMobileNo": '',
    "phoneOfficeNo": '',
    "phoneHomeNo": '',
    "addressPrimary": '',
    "addressSecondary": '',
    "emailPrimary": '',
    "emailSecondary": '',
    "webSiteUrl": '',
    "note": '',
    "tagId": ''
})

/*
const getDefaultModelObject = () => ({
    "firstName": 'Topo',
    "lastName": 'Solutions', 
    "contactName": 'Topo Solutions', 
    "phoneMobileNo": '+85230188089',
    "phoneOfficeNo": '',
    "phoneHomeNo": '',
    "addressPrimary": 'Unit 13-16, 28/F, Paul Y. Centre, 51 Hung To Road, Kwun Tong, HK',
    "addressSecondary": 'Nanyang Plaza, Unit 2507, 25/F, 57 Hung To Rd, Kwun Tong, HK',
    "emailPrimary": 'hello@topo.cc',
    "emailSecondary": '',
    "webSiteUrl": 'www.topo.cc',
    "note": 'Topo empowers you to monitor, inspect and analyze the different stages of your sourcing, product development, production, quality, and sustainability processes within your supply chain.', 
})*/

export default function Contact() {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handelInputChange,
        resetFormControls
    } = useForm(getDefaultModelObject);


    return (     
        <VcardForm 
        {...{ 
            values, 
            setValues,
            errors, 
            setErrors,
            handelInputChange,
            resetFormControls
        }}
        />
    )
}

