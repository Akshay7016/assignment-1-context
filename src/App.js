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


  const addCard = () => {
    if (newTask === "") {
      alert("Please enter task!!!")
    }
    else {
      const tempBoards = [...boards];

      tempBoards[0].cards.push({
        id: v4(),
        name: newTask,
        stage: 0
      });

      setBoards(tempBoards);
      setNewTask("")
    }
  };

  const removeCard = (bid, cid) => {
    const tempBoards = [...boards];
    const cardIndex = tempBoards[bid].cards.findIndex((item) => item.id === cid);

    // To remove card
    tempBoards[bid].cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const goForward = (bid, cid) => {
    const board_id = bid + 1;

    if (board_id <= 3) {
      const tempBoards = [...boards];
      const cardIndex = tempBoards[bid].cards.findIndex((item) => item.id === cid);

      // To store card that gets deleted
      const removed_card = tempBoards[bid].cards[cardIndex];

      //Deletion of card
      tempBoards[bid].cards.splice(cardIndex, 1);

      // Adding card to next board (i.e board + 1)
      tempBoards[board_id].cards.push(removed_card);
      setBoards(tempBoards);
    }
    else {
      return;
    }
  }

  const goBackward = (bid, cid) => {
    const board_id = bid - 1;

    if (board_id >= 0) {
      const tempBoards = [...boards];
      const cardIndex = tempBoards[bid].cards.findIndex((item) => item.id === cid);

      // To store card that gets deleted
      const removed_card = tempBoards[bid].cards[cardIndex];

      //Deletion of card
      tempBoards[bid].cards.splice(cardIndex, 1);

      // Adding card to next board (i.e board + 1)
      tempBoards[board_id].cards.push(removed_card);
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
          <input type="text" value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Enter New Task"></input>
          <button type="submit" className="btn btn-primary ml-2" onClick={addCard}>Add Task</button>
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
