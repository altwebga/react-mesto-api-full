function Forma({ children, title, name, onSubmit, isFormValid, submitButtonText, onClose, loggedIn }) {    
    
    return (

            <div className={loggedIn ? 'popup__container' : 'static-form'}>

                <h2 className={loggedIn ? 'popup__title' : 'static-form__title'}>{title}</h2>

                <form name={name} className={loggedIn ? `${name} popup__form` : `${name} 'static-form__form'`} onSubmit={onSubmit} noValidate>

                    {children}

                    <button
                    type='submit'
                    className={`${loggedIn ? 'popup__button' : 'static-form__button'}
                                ${!isFormValid && `${loggedIn ? 'popup__button_disabled' : 'static-form__button_disabled'}`}`}
                    >{submitButtonText}</button>

                </form>
                
                <button className={loggedIn ? 'popup__close' : '_not_visible'} type='button' onClick={onClose} />

            </div>
                            
    );
}

export default Forma;