import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Popup from './Popup';
import UseValidation from '../hooks/UseValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, submitButtonText, setSubmitButtonText }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const { isFormValid, handleValues, errors, setErrors } = UseValidation();

    function handleNameChange(e) {
        setName(e.target.value);
        handleValues(e)
    } 

    function handleAboutChange(e) {
        setDescription(e.target.value);
        handleValues(e)
    } 
 
    useEffect(() => { 
        if(isOpen){
            setName(currentUser.name);
            setDescription(currentUser.about);
            setErrors({})
            setSubmitButtonText('Сохранить')
        }
    }, [currentUser, isOpen]); 


    function handleSubmit(e) {
        e.preventDefault();      
        onUpdateUser({ name, about: description });
    } 


    return (
        <Popup
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    isOpen={isOpen}
                    name='edit-profile'
                    title='Редактировать профиль'
                    submitButtonText={submitButtonText}
                    isFormValid={isFormValid}
                >       

                    <fieldset className="popup__inputs">

                        <input 
                        value={name ?? ""}
                        onChange={handleNameChange}
                        name="name"
                        id="edit-profile-name"
                        className="popup__input popup__input_type_name" 
                        type="text" 
                        minLength="2"
                        maxLength="40"
                        noValidate
                        required
                        />
                        <p className="popup__error edit-profile-name-error">{errors.name}</p>

                        <input 
                        value={description ?? ""}
                        onChange={handleAboutChange}
                        name="about"
                        id="edit-profile-bio"
                        className="popup__input popup__input_type_descr" 
                        type="text" 
                        minLength="2"
                        maxLength="200"
                        noValidate
                        required
                        />
                        <p className="popup__error edit-profile-bio-error">{errors.about}</p>

                    </fieldset>

                </Popup>
    );
}

export default EditProfilePopup;
