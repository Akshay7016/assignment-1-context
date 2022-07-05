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

      <div className="card_footer">
        <p className={`first_board${boardId}`} onClick={() => goBackward(boardId, id)}>{<ArrowLeftCircle />}</p>
        <p className={`last_board${boardId}`} onClick={() => goForward(boardId, id)}>{<ArrowRightCircle />}</p>
        <p onClick={() => removeCard(boardId, id)}>{<Trash2 />}</p>
      </div>
    </div>
  );
}

export default Card;