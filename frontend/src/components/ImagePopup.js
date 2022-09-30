function ImagePopup({ card, isOpen, onClose, onCardClick }) {
  return (
    <div className={`popup popup_img ${isOpen ? 'popup_opened' : null} `}>
      <div className="popup__img-container">
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
          onClick={onCardClick}
        />
        <button type="button" className="popup__close" onClick={onClose} />
        <p className="popup__img-descr">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
