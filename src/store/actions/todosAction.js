export const GET_TODOS = "GET_TODOS";
export const POST_TODO = "POST_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const LOADER = "LOADER";
export const SET_SEARCH_TODO = "SET_SEARCH_TODO";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const SHOW_MODAL = "SHOW_MODAL";

export const getTodos = () => {
  return async (dispatch) => {
    try {
      if (!navigator.onLine) {
        alert("Please check your internet connection and try again!");
        return;
      } else {
        dispatch({ type: LOADER, payload: true });
        const response = await fetch("http://localhost:3000/todos");
        const todosData = await response.json();
        dispatch({ type: GET_TODOS, payload: todosData });
        setTimeout(() => {
          dispatch({ type: LOADER, payload: false });
        }, 1000);
      }
    } catch (error) {
      alert("Error fetching data!");
      dispatch({ type: LOADER, payload: false });
    }
  };
};

export const postTodo = (newTodo) => {
  return async (dispatch) => {
    try {
      if (!navigator.onLine) {
        alert("Please check your internet connection and try again!");

        return;
      } else {
        dispatch({ type: LOADER, payload: true });
        const response = await fetch(`http://localhost:3000/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: new Date().getMilliseconds(),
            title: newTodo.title,
            desc: newTodo.desc,
            complete: false,
          }),
        });

        const todosData = await response.json();
        dispatch({ type: GET_TODOS, payload: todosData });
        setTimeout(() => {
          dispatch({ type: LOADER, payload: false });
        }, 1000);
      }
    } catch (error) {
      alert("Error fetching data!");
      dispatch({ type: LOADER, payload: false });
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      if (!navigator.onLine) {
        alert("Please check your internet connection and try again!");
        return;
      } else {
        await fetch(`http://localhost:3000/todos/${id}`, {
          method: "DELETE",
        });
      }
    } catch (error) {
      alert("Error deleting todo!");
    }
  };
};
