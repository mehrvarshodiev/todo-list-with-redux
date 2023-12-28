import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AddForm from "./components/AddForm";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <TodoList />
        <AddForm />
      </div>
    </Provider>
  );
};

export default App;
