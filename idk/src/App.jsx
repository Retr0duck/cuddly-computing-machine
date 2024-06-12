import './App.css';
import React, { useState, useEffect } from 'react';
import sv from './assets/todo-list-svgrepo-com.svg';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('');
  const inputRef = React.createRef();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    setTodos([{ name: todo, status: "pending" }, ...todos]);
  }

  function updateStatus(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].status = updatedTodos[index].status === "completed" ? "pending" : "completed";
    setTodos(updatedTodos);
  }

  function remove(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  }

  function handleFilterClick(e) {
    const clickedFilter = e.target.dataset.filter;
    setFilter(clickedFilter === filter ? '' : clickedFilter);
  }

  const filteredTodos = filter ? todos.filter(todo => todo.status === filter) : todos;

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input ref={inputRef} className="todo-input" placeholder="Add a new task..." />
        <button className="add-button" onClick={() => addTodo(inputRef.current.value)}>
          <i className="fa fa-plus-circle"></i>
        </button>
      </div>
      <div className="filters">
        <div className={`filter ${filter === 'completed' ? 'active' : ''}`} data-filter="completed" onClick={handleFilterClick}>Complete</div>
        <div className={`filter ${filter === 'pending' ? 'active' : ''}`} data-filter="pending" onClick={handleFilterClick}>Incomplete</div>
        <div className="delete-all" onClick={() => setTodos([])}>Delete All</div>
      </div>
      <div className="todos-container">
        <ul className="todos">
          {filteredTodos.map((todo, index) => (
            <li key={index} className="todo">
              <label htmlFor={index}>
                <input id={index} type="checkbox" checked={todo.status === "completed"} onChange={() => updateStatus(index)} />
                <span className={todo.status === "completed" ? "checked" : ""}>{todo.name}</span>
              </label>
              <button className="delete-btn" onClick={() => remove(index)}>
                <i className="fa fa-times"></i>
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && <img className="empty-image" src={sv} />}
      </div>
    </div>
  );
}

export default App;