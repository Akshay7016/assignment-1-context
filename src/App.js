import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import { v4 } from 'uuid';
import { TodoContext } from './context/TodoContext';

const initialTask = [
  {
    id: 0,
    title: "Backlog",
    cards: [
      {
        id: v4(),
        name: "Card 1",
        stage: 0
      },
      {
        id: v4(),
        name: "Card 2",
        stage: 0
      }
    ]
  },
  {
    id: 1,
    title: "To Do",
    cards: []
  },
  {
    id: 2,
    title: "Inprogress",
    cards: []
  },
  {
    id: 3,
    title: "Done",
    cards: []
  }


];


const App = () => {

  const [boards, setBoards] = useState(initialTask);
  const [newTask, setNewTask] = useState("");

  // Function to add card in first board
  const addCard = () => {
    if (newTask) {
      const tempBoards = [...boards];
      tempBoards[0].cards = [...tempBoards[0].cards, {
        id: v4(),
        name: newTask,
        stage: 0
      }]

      setBoards(tempBoards);
      setNewTask("")
    }
    else {
      console.log("Please enter task!!!")
    }
  };

  // Function to remove card from particular board
  const removeCard = (bid, cid) => {
    const tempBoards = [...boards];
    tempBoards[bid].cards = tempBoards[bid].cards.filter((item) => item.id !== cid);
    setBoards(tempBoards)
  };

  // Function to move card to next board
  const goForward = (bid, cid) => {
    const next_board_id = bid + 1;

    if (next_board_id <= 3) {
      const tempBoards = [...boards];
      const cardIndex = tempBoards[bid].cards.findIndex((item) => item.id === cid);

      // To store card that gets deleted
      const removed_card = tempBoards[bid].cards[cardIndex];

      //Deletion of card
      tempBoards[bid].cards.splice(cardIndex, 1);

      // Adding card to next board (i.e board + 1)
      tempBoards[next_board_id].cards.push(removed_card);
      setBoards(tempBoards);
    }
    else {
      return;
    }
  }

  // Function to move card to previous board
  const goBackward = (bid, cid) => {
    const prev_board_id = bid - 1;

    if (prev_board_id >= 0) {
      const tempBoards = [...boards];
      const cardIndex = tempBoards[bid].cards.findIndex((item) => item.id === cid);

      // To store card that gets deleted
      const removed_card = tempBoards[bid].cards[cardIndex];

      //Deletion of card
      tempBoards[bid].cards.splice(cardIndex, 1);

      // Adding card to next board (i.e board + 1)
      tempBoards[prev_board_id].cards.push(removed_card);
      setBoards(tempBoards);

    }
    else {
      return;
    }
  }



  return (
    <TodoContext.Provider value={{ removeCard, goForward, goBackward }}>
      <div className='app'>
        <div className='app_navbar bg-info'>
          <h2>Todo</h2>
        </div>

        <div className="app_title">
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Enter New Task"
            required>
          </input>

          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={addCard}>
            Add Task
          </button>
        </div>

        <div className='app_boards_container'>
          <div className='app_boards'>
            {
              boards.map((item) => (
                <Board key={item.id}
                  board={item}
                />
              ))
            }
          </div>
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
