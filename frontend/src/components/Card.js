import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;

    const isLiked = card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked && 'card__like-button_active'}`
    ); 

    const cardDeleteButtonClassName = (
        `card__trash-button ${!isOwn && 'card__trash-button_no-active'}`
    ); 

    function handleCardClick(){
        onCardClick(card)
    }

    function handleLikeClick(){
        onCardLike(card)
    }

    function handleCardDelete(){
        onCardDelete(card)
    }

    return (
        <li className="card">
            <img className="card__img" src={card.link} alt={card.name} onClick={handleCardClick}/>
            <div className="card__heading">
                <h2 className="card__title">{card.name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
                
            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete} />
        </li>
    );
}

export default React.memo(Card);
