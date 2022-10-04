import React, { useEffect } from 'react';
import UseValidation from '../hooks/UseValidation';
import Forma from './Forma';
import { Link } from "react-router-dom";

function Register({ submitButtonText, setSubmitButtonText, loggedIn, onRegister }) {
    const { isFormValid, values, handleValues, errors, setInitialValues } = UseValidation();
    
    useEffect(() => {
        setSubmitButtonText('Зарегистрироваться')
        setInitialValues({email: '', pass: ''}) 
    }, [])


    function handleSubmit(e) {
        e.preventDefault();     
        onRegister({ password: values.pass, email: values.email });
    } 


    return (
        <>
        
        <Forma
                loggedIn={loggedIn}
                onSubmit={handleSubmit}
                name='login'
                title='Регистрация'
                submitButtonText={submitButtonText}
                isFormValid={isFormValid}
            >       
                
            <fieldset className="popup__inputs">
                <input 
                value={values.email || ''}
                onChange={handleValues}
                name="email"
                id="email"
                className="static-form__input" 
                type="email" 
                placeholder="Email" 
                noValidate
                required
                />
                <p className="popup__error">{errors.email}</p>

                <input 
                value={values.pass || ''}
                onChange={handleValues}
                name="pass"
                id="pass"
                className="static-form__input" 
                type="password" 
                minLength="6"
                maxLength="30"
                placeholder="Пароль" 
                noValidate
                required
                />
                <p className="popup__error">{errors.pass}</p>
            </fieldset>
                        
        </Forma>

        <p className="static-form__undertext">Уже зарегистрированы? <Link className="header__link header__link_place_form" to='/sign-in'>Войти</Link></p>
        
        </>
    );
}

export default Register;
