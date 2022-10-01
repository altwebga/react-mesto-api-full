function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : null} `}
    >
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <form
          name={`${name}`}
          action="#"
          className={`popup__form popup__form_change-${name}`}
          onSubmit={onSubmit}
        >
          <fieldset className="popup__fieldset">
            <h2 className="popup__title">{title}</h2>
            {children}
            <button type="submit" className="popup__button">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
