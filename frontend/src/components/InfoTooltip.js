import okImg from '../images/icon-failed.svg';
import problemImg from '../images/icon-success.svg';

function InfoTooltip(props) {

    return (
            <section id={'popup'} className={`popup ${props.isOpen && 'popup_active'}`}>

                <div className="popup__container popup__container_register">
                    <img src={`${props.statusRegister ? problemImg : okImg}`} alt="Регистрация" className="popup__img popup__img_register"/>
                    <h2 className="popup__title popup__title_register">
                    {props.registrationMessage}
                    </h2>
                    
                <button className="popup__close" type="button" onClick={props.onClose} />
                </div>
                <div className="popup__bg" onClick={props.onClose} />
            </section>
    );
}

export default InfoTooltip;