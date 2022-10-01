import { useContext } from 'react';
import Card from './Card';
import userContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onDeleteCard,
  onLikeCard,
}) {
  const { name, description, avatar } = useContext(userContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={avatar}
            alt="Аватар пользователя"
          />
          <div className="profile__avatar-hover" onClick={onEditAvatar} />
        </div>
        <div className="profile__content">
          <div className="profile__wrapper">
            <h1 className="profile__name">{name}</h1>
            <button
              type="button"
              className="profile__edit"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__profession">{description}</p>
        </div>
        <button
          type="button"
          className="profile__button"
          onClick={onAddPlace}
        />
      </section>

      <section className="card">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={onLikeCard}
              onDeleteCard={onDeleteCard}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
