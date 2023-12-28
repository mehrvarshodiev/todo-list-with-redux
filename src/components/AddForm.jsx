import React, { useRef, useState } from "react";
import "./AddForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  POST_TODO,
  SHOW_MODAL,
  getTodos,
  postTodo,
} from "../store/actions/todosAction";

const initialValue = {
  title: "",
  desc: "",
};

const AddForm = () => {
  const [newTodo, setNewTodo] = useState(initialValue);
  const submitBtnRef = useRef("");
  const titleRef = useRef("");
  const descRef = useRef("");

  const showModal = useSelector((state) => state.todosReducer.showModal);
  const dispatch = useDispatch();

  const handleCloseModal = (e) => {
    if (e.target.matches(".overlay.show")) {
      dispatch({ type: SHOW_MODAL, payload: false });
      document.body.style.overflow = "auto";
    }
  };

  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleRef.current.value == "") {
      titleRef.current.focus();
    } else if (descRef.current.value == "") {
      descRef.current.focus();
    } else {
      dispatch(postTodo(newTodo));
      dispatch(getTodos());
      dispatch({ type: SHOW_MODAL, payload: false });
      document.body.style.overflow = "auto";
      setNewTodo(initialValue);
    }
  };

  return (
    <div
      className={`overlay ${showModal ? "show" : ""}`}
      onClick={handleCloseModal}
    >
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="form_control">
          <label htmlFor="title">
            Title: <span>*</span>
          </label>
          <input
            ref={titleRef}
            type="text"
            id="title"
            name="title"
            value={newTodo.title}
            placeholder="Enter a title"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <label htmlFor="desc">
            Desc: <span>*</span>
          </label>
          <input
            ref={descRef}
            type="text"
            id="desc"
            name="desc"
            value={newTodo.desc}
            placeholder="Enter desc..."
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <div className="form_control">
          <button
            ref={submitBtnRef}
            type="submit"
            className={`submit_btn active`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
