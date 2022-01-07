import React, { useState } from "react";

export function useForm(getFreshModelObject) {

    const [values, setValues] = useState(getFreshModelObject());
    const [errors, setErrors] = useState({});

    const handelInputChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        });
    }

    const resetFormControls = () => {
        setValues(getFreshModelObject());
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