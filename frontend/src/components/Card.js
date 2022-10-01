import { useContext } from "react";
import userContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteCard }) {
  const { id } = useContext(userContext);

  const isOwn = card.owner._id === id;

  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "" : "card__delete_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === id);

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  return (
    <div className="card__place">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={() => onDeleteCard(card)}
      />
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={() => {
          onCardClick({ name: card.name, link: card.link });
        }}
      />
      <div className="card__text">
        <h3 className="card__name">{card.name}</h3>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
