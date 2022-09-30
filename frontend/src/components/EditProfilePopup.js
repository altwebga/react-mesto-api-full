import { useState, useContext, useEffect } from 'react';
import userContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const user = useContext(userContext);

  useEffect(() => {
    setNameValue(user.name);
    setDescriptionValue(user.description);
  }, [user, isOpen]);

  const handleUsernameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleUserDescriptionChange = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: nameValue,
      about: descriptionValue,
    });
  };

  return (
    <PopupWithForm
      name="edit_profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        id="name-input"
        placeholder="Имя"
        type="text"
        name="name"
        className="popup__text popup__text_value_name"
        value={nameValue || ''}
        onChange={handleUsernameChange}
      />
      <span className="popup__text-error name-input-error"></span>
      <input
        required
        minLength="2"
        maxLength="200"
        id="job-input"
        placeholder="Профессия"
        type="text"
        name="description"
        className="popup__text popup__text_value_descr"
        value={descriptionValue || ''}
        onChange={handleUserDescriptionChange}
      />
      <span className="popup__text-error job-input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
