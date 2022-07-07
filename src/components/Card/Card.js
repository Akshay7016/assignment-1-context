import React, { useContext } from "react";
import { ArrowLeftCircle, ArrowRightCircle, Trash2 } from "react-feather";

import { TodoContext } from "../../context/TodoContext";
import "./Card.css";

const Card = ({ card, boardId }) => {

  // We got Provider's data using useContext hook and after that destructured it
  const { removeCard, goForward, goBackward } = useContext(TodoContext);

  // Card id and Card name using destructuring of object "card"
  const { id, name } = card;

  return (

    <div className="card" >
      <div className="card_title">{name}</div>

      {/* Cards button */}
      <div className="card-buttons">
        <ul className="button-list">
          <li className={`first_board${boardId}`} onClick={() => goBackward(boardId, id)}>{<ArrowLeftCircle />}</li>
          <li className={`last_board${boardId}`} onClick={() => goForward(boardId, id)}>{<ArrowRightCircle />}</li>
          <li onClick={() => removeCard(boardId, id)}>{<Trash2 />}</li>
        </ul>
      </div>
    </div>
  );
}

export default Card;