import React, { useEffect } from 'react';
import Popup from './Popup';
import UseValidation from '../hooks/UseValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, submitButtonText, setSubmitButtonText }) {
    const { isFormValid, values, handleValues, errors, setInitialValues } = UseValidation();
    
    useEffect(() => {
        if(isOpen){
            setSubmitButtonText('Сохранить')
            setInitialValues({name: '', link: ''}) 
        }    
    }, [isOpen])


    function handleSubmit(e) {
        e.preventDefault();     
        onAddPlace({ name: values.name, link: values.link});
    } 


    return (
        <Popup
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    isOpen={isOpen}
                    name='add-card'
                    title='Новое место'
                    submitButtonText={submitButtonText}
                    isFormValid={isFormValid}
                > 

                <fieldset className="popup__inputs">
                    <input 
                    value={values.name || ''}
                    onChange={handleValues}
                    name="name"
                    id="edit-foto-name"
                    className="popup__input popup__input_type_mesto-name" 
                    type="text" 
                    placeholder="Название" 
                    minLength="2"
                    maxLength="30"
                    noValidate
                    required
                    />
                    <p className="popup__error edit-foto-name-error">{errors.name}</p>

                    <input 
                    value={values.link || ''}
                    onChange={handleValues}
                    name="link"
                    id="edit-foto-url"
                    className="popup__input popup__input_type_mesto-url" 
                    type="url" 
                    placeholder="Ссылка на картинку" 
                    noValidate
                    required
                    />
                    <p className="popup__error edit-foto-url-error">{errors.link}</p>
                </fieldset>
           
        </Popup>
    );
}

export default AddPlacePopup;
