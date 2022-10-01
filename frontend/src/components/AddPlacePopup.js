import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [nameValue, setNameValue] = useState('');
  const [linkValue, setLinkValue] = useState('');

  const handlePlaceNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handlePlaceLinkChange = (e) => {
    setLinkValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({ name: nameValue, link: linkValue });
  };

  return (
    <PopupWithForm
      name="edit_cards"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        id="place-input"
        placeholder="Название"
        type="text"
        name="name"
        className="popup__text popup__text_value_title"
        value={nameValue || ''}
        onChange={handlePlaceNameChange}
      />
      <span className="popup__text-error place-input-error"></span>
      <input
        required
        id="link-input"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        className="popup__text popup__text_value_link"
        value={linkValue || ''}
        onChange={handlePlaceLinkChange}
      />
      <span className="popup__text-error link-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
