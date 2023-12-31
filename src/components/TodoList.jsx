import React, { useEffect, useRef, useState } from "react";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  LOADER,
  SET_FILTER_TODOS,
  SET_SEARCH_TODO,
  SHOW_MODAL,
  changeTodoStatus,
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
  const dispatch = useDispatch();
  const [randomRGBA, setRandomRGBA] = useState([]);
  const todos = useSelector((state) => state.todosReducer.todos);
  const loading = useSelector((state) => state.todosReducer.loading);
  const searchTodo = useSelector((state) => state.todosReducer.searchTodo);
  const filterTodos = useSelector((state) => state.todosReducer.filterTodos);
  const filterSelectElRef = useRef("");

  const [cloneTodos, setCloneTodos] = useState(todos);
  const renderTodos =
    searchTodo.toLowerCase().trim() || filterTodos ? cloneTodos : todos;
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

  useEffect(() => {
    console.log(filterTodos);
    setCloneTodos(
      todos.filter((todo) => {
        if (filterTodos == "all") {
          return todo;
        }
        return String(todo.complete) == filterTodos;
      })
    );
  }, [filterTodos]);

  const resetTodoFiltering = () => {
    dispatch({ type: SET_FILTER_TODOS, payload: "" });
    filterSelectElRef.current.value = "all";
  };
  const resetTodoSearching = () => {
    dispatch({ type: SET_SEARCH_TODO, payload: "" });
  };

  const showAddModal = () => {
    dispatch({ type: SHOW_MODAL, payload: true });
    document.body.style.overflow = "hidden";
    dispatch({ type: SET_SEARCH_TODO, payload: "" });
    resetTodoFiltering();
  };

  const handleSearchTodo = (e) => {
    dispatch({ type: LOADER, payload: true });
    dispatch({ type: SET_SEARCH_TODO, payload: e.target.value });
    setTimeout(() => {
      dispatch({ type: LOADER, payload: false });
    }, 250);
    resetTodoFiltering();
  };

  function handleFilterTodos(e) {
    dispatch({ type: LOADER, payload: true });
    dispatch({ type: SET_FILTER_TODOS, payload: e.target.value });
    setTimeout(() => {
      dispatch({ type: LOADER, payload: false });
    }, 250);
    resetTodoSearching();
  }

  const handleChangeStatus = (todo) => {
    dispatch(changeTodoStatus(todo));
    resetTodoSearching();
    resetTodoFiltering();
    dispatch(getTodos());
  };

  const handleDeleteTodo = ({ id }) => {
    const deleteConfirmation = confirm(
      "Are you sure you want to delete this todo?"
    );
    deleteConfirmation && (dispatch(deleteTodo(id)), dispatch(getTodos()));
    resetTodoSearching();
    resetTodoFiltering();
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
            <select
              ref={filterSelectElRef}
              title="filter todos"
              onChange={handleFilterTodos}
            >
              <option value="all">All</option>
              <option value="false">Pending</option>
              <option value="true">Completed</option>
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
                  <h1 className={`${todo.complete && "completed"}`}>
                    {todo["title"]}
                  </h1>
                  <p>{todo["desc"]}</p>
                  <div className="setting">
                    <div className="change_status_content">
                      <input
                        checked={todo.complete}
                        type="checkbox"
                        id={todo.id}
                        onChange={() => {
                          handleChangeStatus(todo);
                        }}
                      />
                      <label htmlFor={todo.id}>
                        {todo.complete ? "Completed" : "Pending"}
                      </label>
                    </div>
                    <button
                      className="delete_btn"
                      onClick={() => handleDeleteTodo(todo)}
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
