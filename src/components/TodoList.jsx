import React, { useEffect, useState } from "react";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_STATUS,
  LOADER,
  SET_SEARCH_TODO,
  SHOW_MODAL,
  deleteTodo,
  getTodos,
} from "../store/actions/todosAction";

const getRandomColors = () => {
  const r = Math.ceil(Math.random() * 255);
  const g = Math.ceil(Math.random() * 255);
  const b = Math.ceil(Math.random() * 255);
  const a = (Math.random() * 0.5).toFixed(2);
  const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
  return rgba;
};

const TodoList = () => {
  const [randomRGBA, setRandomRGBA] = useState([]);
  let [idx, setIdx] = useState(null);
  const todos = useSelector((state) => state.todosReducer.todos);
  const loading = useSelector((state) => state.todosReducer.loading);
  const searchTodo = useSelector((state) => state.todosReducer.searchTodo);
  const isCompleted = useSelector((state) => state.todosReducer.isCompleted);
  const dispatch = useDispatch();
  const [cloneTodos, setCloneTodos] = useState(todos);
  const renderTodos = searchTodo.toLowerCase().trim() ? cloneTodos : todos;
  useEffect(() => {
    dispatch(getTodos());
  }, []);
  useEffect(() => {
    if (todos?.length) {
      let randomColors = [];
      for (let i = 0; i < todos.length; i++) {
        randomColors.push(getRandomColors());
      }
      setRandomRGBA(randomColors);
    }
  }, [todos.length]);

  useEffect(() => {
    setCloneTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTodo.toLowerCase().trim())
      )
    );
  }, [searchTodo]);

  const handleDeleteBtn = ({ id }) => {
    const deleteConfirmation = confirm(
      "Are you sure you want to delete this todo?"
    );
    deleteConfirmation && (dispatch(deleteTodo(id)), dispatch(getTodos()));
  };

  const handleSearchTodo = (e) => {
    dispatch({ type: LOADER, payload: true });
    dispatch({ type: SET_SEARCH_TODO, payload: e.target.value });
    setTimeout(() => {
      dispatch({ type: LOADER, payload: false });
    }, 600);
  };

  const handleChangeStatus = (id) => {
    setIdx(id);
    dispatch({ type: CHANGE_STATUS, payload: !isCompleted });
  };

  const showAddModal = (e) => {
    dispatch({ type: SHOW_MODAL, payload: true });
    document.body.style.overflow = "hidden";
  };

  return (
    <section className="todos_wrapper">
      <header className="todos_header">
        <a className="logo">
          <span>T</span>odo<span>A</span>pp
        </a>
        <button className="add_btn" onClick={showAddModal}>
          Add
        </button>
      </header>
      <main className="todos_main">
        <aside className="sidebar">
          <div className="search_todo">
            <input
              value={searchTodo}
              onChange={handleSearchTodo}
              type="search"
              placeholder="search todo..."
            />
          </div>
          <div className="filter_todos">
            <select name="filter-by-status">
              <option value="">All</option>
              <option value="false">Pending</option>
              <option value="true">Complete</option>
            </select>
          </div>
        </aside>
        <section className="todo_cards">
          {loading ? (
            <div className="loader"></div>
          ) : todos?.length > 0 ? (
            renderTodos.map((todo, i) => {
              return (
                <div
                  className="card"
                  key={todo.id}
                  style={{
                    background: randomRGBA[i],
                  }}
                >
                  <h1
                    className={`${
                      isCompleted && todo.id == idx && "completed"
                    }`}
                  >
                    {todo["title"]}
                  </h1>
                  <p>{todo["desc"]}</p>
                  <div className="setting">
                    <div className="change_status_content">
                      <input
                        type="checkbox"
                        id={todo.id}
                        onChange={() => {
                          handleChangeStatus(todo.id);
                        }}
                      />
                      <label htmlFor={todo.id}>Complete</label>
                    </div>
                    <button
                      className="delete_btn"
                      onClick={() => handleDeleteBtn(todo)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no_todos">No todos here!</div>
          )}
        </section>
      </main>
    </section>
  );
};

export default TodoList;
