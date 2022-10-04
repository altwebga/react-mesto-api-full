import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { api, apiAuth } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, withRouter } from "react-router-dom";
import InfoTooltip from './InfoTooltip';

function App(props) {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    
    const [selectedCard, setSelectedCard] = useState({});
    const [isCardPopupOpen, setIsCardPopupOpenState] = useState(false);
    
    const [cards, setInitialCards] = useState([]);
    
    const [submitButtonText, setSubmitButtonText] = useState('');
    
    const [statusRegister, setStatusRegister] = useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState('');


    useEffect(() => {
        checkToken()
    }, [])


    useEffect(() => {
        if(loggedIn){
            Promise.all([api.getInitialCards(), api.getProfileInfo()])
                .then(([cards, info]) => {
                    console.log(cards)
                    console.log(info.data)
                    setInitialCards(cards.data)
                    setCurrentUser(info.data)
                })
                .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`));
        }
    }, [loggedIn])


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        
        api.setCardLike(card._id, !isLiked ? 'PUT' : 'DELETE')
            .then((newCard) => {
                setInitialCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`));
    } 
    

    function handleCardDelete(card) {  
        setSubmitButtonText("Удаление...");

        api.deleteCard(card._id)
            .then((res) => {
                setInitialCards((newCards) => newCards.filter((c) => c._id !== card._id));
                closeAllPopups();
                setSelectedCard({});
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`))
            .finally(() => {
                setSubmitButtonText("Да");
            })
    } 

    function handleAddPlaceSubmit({name, link}) {
        setSubmitButtonText("Сохранение...");

        api.createNewCard({name, link})
            .then(res => {
                setInitialCards([res.data, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`))
            .finally(() => {
                setSubmitButtonText("Сохранить");
            })
    }


    function handleUpdateUser({name, about}) {
        setSubmitButtonText("Сохранение...");

        api.changeProfileInfo({name, about})
            .then(res => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`))
            .finally(() => {
                setSubmitButtonText("Сохранить");
            })
    }

    function handleUpdateAvatar({avatar}) {
        setSubmitButtonText("Сохранение...");

        api.changeProfileAvatar({avatar})
            .then(res => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`))
            .finally(() => {
                setSubmitButtonText("Сохранить");
            })
    }

    function handleRegister({ password, email }) {
        setSubmitButtonText("Регистрация...");
        
        api.register({ password, email })
            .then(res => {
                setStatusRegister(true);
                setRegistrationMessage('Вы успешно зарегистрировались!');
                setIsInfoToolTipOpen(true);
            })
            .catch(err => {
                setRegistrationMessage('Что-то пошло не так. Попробуйте еще раз.')
                setIsInfoToolTipOpen(true);
            })
            .finally(() => {
                setSubmitButtonText("Зарегистрироваться");
            })
    }

    function handleLogin({ password, email }) {
        setSubmitButtonText("Вход...");
        
        api.login({ password, email })
            .then(res => {
                localStorage.setItem('jwt', res.token);
                setUserEmail(email)
                setLoggedIn(true)
                props.history.push('/')
            })
            .catch(err => alert(`Что-то пошло не так, попробуйте заново`))
            .finally(() => {
                setSubmitButtonText('Войти');
            })
    }

    function checkToken(){
        if (localStorage.getItem('jwt')){
            const jwt = localStorage.getItem('jwt');

        api.checkToken(jwt)
            .then(res => {
                setLoggedIn(true)
                setUserEmail(res.data.email)
                props.history.push('/')
            })
            .catch(err => alert(`Что-то пошло не так, попробуйте заново`))
        }
    }

    function signOut(){        
        setLoggedIn(false)
        localStorage.removeItem('jwt');
        props.history.push('/sign-in')       
    }



    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {        
        setIsEditAvatarPopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsCardPopupOpenState(true)
    }

    function handleDeleteButtonClick(card) {
        setSelectedCard(card)
        setIsDeleteCardPopupOpen(true)
    }

    function handleCloseImagePopup() {
        setSelectedCard({});
        closeAllPopups()
    }

    function handleCloseInfoToolTip() {
        if(statusRegister && isInfoToolTipOpen) {
            closeAllPopups()
            setStatusRegister(false);
            setSubmitButtonText('');
            props.history.push('/sign-in')
        } else {closeAllPopups()}
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false) 
        setIsDeleteCardPopupOpen(false)
        setIsCardPopupOpenState(false)
        setIsInfoToolTipOpen(false)
    }


    return (
        <div className="container">
            <CurrentUserContext.Provider value={currentUser}>

                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userEmail={userEmail} signOut={signOut}/>

                <Switch>

                    <ProtectedRoute
                    exact
                    path="/"
                    component={Main}
                    loggedIn={loggedIn}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteButtonClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    />
                                        
                    <Route path="/sign-in">
                        <Login loggedIn={loggedIn} onLogin={handleLogin} submitButtonText={submitButtonText} setSubmitButtonText={setSubmitButtonText} />
                    </Route>

                    <Route path='/sign-up'>
                        <Register loggedIn={loggedIn} onRegister={handleRegister} submitButtonText={submitButtonText} setSubmitButtonText={setSubmitButtonText} />
                    </Route>

                </Switch>


                

                {loggedIn && (
                    <>
                        <Footer />

                        <EditProfilePopup
                        loggedIn={loggedIn}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        submitButtonText={submitButtonText}
                        setSubmitButtonText={setSubmitButtonText}
                        />                 
        
                        <EditAvatarPopup
                        loggedIn={loggedIn}
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        submitButtonText={submitButtonText}
                        setSubmitButtonText={setSubmitButtonText}
                        />
        
                        <AddPlacePopup
                        loggedIn={loggedIn}
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        submitButtonText={submitButtonText}
                        setSubmitButtonText={setSubmitButtonText}
                        />
        
                        <DeleteCardPopup
                        loggedIn={loggedIn}
                        selectedCard={selectedCard}
                        isOpen={isDeleteCardPopupOpen}
                        onClose={closeAllPopups}
                        onDeleteCard={handleCardDelete}
                        submitButtonText={submitButtonText}
                        setSubmitButtonText={setSubmitButtonText}
                        />
        
                        <ImagePopup
                        loggedIn={loggedIn}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                        isOpen={isCardPopupOpen}
                        onClose={handleCloseImagePopup}
                        />
                    </>
                    )}

                <InfoTooltip
                loggedIn={loggedIn}                
                statusRegister={statusRegister}
                registrationMessage={registrationMessage}
                isOpen={isInfoToolTipOpen}
                onClose={handleCloseInfoToolTip}
                />

            </CurrentUserContext.Provider>
        </div>
    );
}

export default withRouter(App);
