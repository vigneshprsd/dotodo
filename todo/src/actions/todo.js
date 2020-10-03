import axios from "axios";
import { setAlert } from "./alert";
import { DELETE_TODO, GET_TODOS, TODO_ERROR, ADD_TODO } from "./types";

// add todos
export const addTodos = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };




  try {
    const res = await axios.post("/api/todo", formData, config);
    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
    dispatch(setAlert("New todo Added", "success"));
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get todos
export const getTodos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/todo");
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete todos
export const deleteTodos = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/todo/${id}`);
    console.log(res);
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
    dispatch(setAlert("Todo Deleted", "success"));
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
