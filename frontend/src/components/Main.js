import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main ({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__card">
                    <div className="profile__avatar" onClick={onEditAvatar}>
                        <img className="profile__img" src={currentUser.avatar} alt="Фото"/>       
                    </div>
                    
                        <div className="profile__info">
                            <div className="profile__title">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                            </div>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>

            <section>
                <ul className="cards">
                
                    {cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                    ))}
                    

                </ul>
            </section>
        </main>
    );
}

export default React.memo(Main);
