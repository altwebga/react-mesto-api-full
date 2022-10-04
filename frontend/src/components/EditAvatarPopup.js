import React, { useEffect, useRef } from 'react';
import Popup from './Popup';
import UseValidation from '../hooks/UseValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, submitButtonText, setSubmitButtonText }) {  
    const inputRef = useRef();    
    const { isFormValid, values, handleValues, errors, setInitialValues } = UseValidation(); 

    useEffect(() => {
        if(isOpen){
            setSubmitButtonText('Сохранить')
            setInitialValues({ avatar: '' })
        }
    }, [isOpen])


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: inputRef.current.value });
    }


    return (
        <Popup
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    isOpen={isOpen}
                    name='edit-avatar'
                    title='Обновить аватар'
                    submitButtonText={submitButtonText}
                    isFormValid={isFormValid}
                >       
                    
                    <fieldset className="popup__inputs">
                        <input 
                        ref={inputRef}
                        value={values.avatar || ''}
                        onChange={handleValues}
                        name="avatar"
                        id="edit-avatar-url"
                        className="popup__input popup__input_type_mesto-url" 
                        type="url" 
                        placeholder="Ссылка на картинку" 
                        noValidate
                        required
                        />
                        <p className="popup__error edit-avatar-url-error">{errors.avatar}</p>
                    </fieldset>
                
                </Popup>
    );
}

export default EditAvatarPopup;
