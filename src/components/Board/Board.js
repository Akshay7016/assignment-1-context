import React from "react";

import Card from '../Card/Card'
import "./Board.css";

const Board = ({ board }) => {

    return (
        <div className="board">
            <div className="board_top">
                <h4 className="board_top_title">
                    {board.title}
                </h4>
            </div>
            <div className="board_cards custom-scroll">
                {board.cards?.map((item) => (
                    <Card key={item.id}
                        card={item}
                        boardId={board.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default Board;