import Forma from "./Forma";

function Popup(props, loggedIn) {

    return (
            <section id={`${props.name}-popup`} className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`}>

                <Forma 
                loggedIn={loggedIn} 
                children={props.children} 
                title={props.title} name={props.name} 
                onSubmit={props.onSubmit} 
                isFormValid={props.isFormValid} 
                submitButtonText={props.submitButtonText} 
                onClose={props.onClose} 
                />
                
                <div className="popup__bg" onClick={props.onClose} />
            </section>
    );
}

export default Popup;