import { useState } from "react";

export function useForm(getDefaultModelObject) {

    const [values, setValues] = useState(getDefaultModelObject());
    const [errors, setErrors] = useState({});

    const handelInputChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        });
    }

    const resetFormControls = () => {
        setValues(getDefaultModelObject());
        setErrors({});
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handelInputChange,
        resetFormControls
    }
}