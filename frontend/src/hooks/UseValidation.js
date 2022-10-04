import { useEffect, useState } from 'react';

function UseValidation() {
    const [values, setValues] = useState({});
    const [isValuesValid, setIsValuesValid] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    function handleValues(e) {
        setValues({...values, [e.target.name]: e.target.value})
        setIsValuesValid({...isValuesValid, [e.target.name]: e.target.validity.valid})
        setErrors({...errors, [e.target.name]: e.target.validationMessage})
    }

    function setInitialValues(initialInputs) {
        setValues(initialInputs)
        setIsValuesValid(initialInputs)
        setErrors(initialInputs)
    }

    
    useEffect(() => {
        if((Object.values(isValuesValid).every(i => i === true) && Object.values(isValuesValid).length !== 0)){
            setIsFormValid(true)
        }
        else {
            setIsFormValid(false)
        }
    },  [isValuesValid])


    return ({
        isFormValid,
        values,
        handleValues, 
        errors, 
        setInitialValues,
        setIsFormValid,
        setErrors,
        setValues

    });
}

export default UseValidation;
