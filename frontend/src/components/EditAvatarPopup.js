import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const linkRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: linkRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="edit_photo"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        id="photo-input"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        className="popup__text popup__text_value_link"
        ref={linkRef}
      />
      <span className="popup__text-error photo-input-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
