import { GET_TODOS, TODO_ERROR, DELETE_TODO, ADD_TODO } from "../actions/types";

const initialState = {
  todos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TODO:
    return{
        ...state,
        todos:[...state.todos,payload],
        loading:false
    }
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
