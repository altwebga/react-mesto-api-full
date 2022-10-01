import success from '../images/icon-success.svg';
import failed from '../images/icon-failed.svg';

function InfoTooltip({ isOpen, onClose, isSuccessTooltipStatus, text }) {
  const getImage = () => {
    return isSuccessTooltipStatus ? success : failed;
  };

  return (
    <div className={`popup popup-info ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup-info__container">
        <img src={getImage()} alt="" className="popup-info__image" />
        <h3 className="popup-info__info">{text}</h3>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
