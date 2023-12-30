import {
  CHANGE_STATUS,
  DELETE_TODO,
  GET_TODOS,
  LOADER,
  POST_TODO,
  SET_SEARCH_TODO,
  SHOW_MODAL,
} from "../actions/todosAction";

const initialData = {
  todos: [],
  filterTodos: [], //NOT done!
  loading: false,
  searchTodo: "",
  changeStatus: false,
  showModal: false,
  newTodo: {},
};

export const todosReducer = (state = initialData, action) => {
  switch (action.type) {
    case LOADER:
      return { ...state, loading: action.payload };
    case SET_SEARCH_TODO:
      return { ...state, searchTodo: action.payload };
    case CHANGE_STATUS:
      return { ...state, changeStatus: action.payload };
    case GET_TODOS:
      return { ...state, todos: action.payload };
    case POST_TODO:
      return { ...state, newTodo: action.payload };
    case DELETE_TODO:
      return { ...state, todos: action.payload };
    case SHOW_MODAL:
      return { ...state, showModal: action.payload };
    default:
      return state;
  }
};
