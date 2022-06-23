import React, { useContext } from "react";
import { ArrowLeftCircle, ArrowRightCircle, Trash2 } from "react-feather";
import "./Card.css";
import { TodoContext } from "../../context/TodoContext";

const Card = ({ card, boardId }) => {

  const { removeCard, goForward, goBackward } = useContext(TodoContext);

  // Card id using destructuring of object
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