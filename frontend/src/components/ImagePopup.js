function ImagePopup({ isOpen, selectedCard, onClose }) {
    
    return (
            <section id="foto-popup" className={`popup popup_type_foto-popup ${isOpen && 'popup_active'}`}>
                <div className="popup__foto">
                    <img className="popup__img" src={selectedCard.link} alt={selectedCard.name} />
                    <h2 className="popup__text">{selectedCard.name}</h2>
                    <button className="popup__close" type="button" onClick={onClose} />
                </div>
                <div className="popup__bg" onClick={onClose} />
            </section>
    );
}

export default ImagePopup;
