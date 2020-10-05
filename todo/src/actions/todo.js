import axios from "axios";
import { setAlert } from "./alert";
import { DELETE_TODO, GET_TODOS, TODO_ERROR, ADD_TODO, UPDATE_TODO } from "./types";


const sleep =(ms) => (response) =>
    new Promise(resolve => setTimeout(()=>resolve(response),ms));

// add todos
export const addTodos = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


  try {
    const res = await axios.post("/api/todo", formData, config);
    await sleep(3000);
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
    await axios.delete(`/api/todo/${id}`);
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



//update todo
export const editTodo = (formData) => async (dispatch) => {

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
   // const formData = JSON.stringify({ title, text });
    const res = await axios.put(`/api/todo/${formData.id}`, formData, config);
    console.log(res);
    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    });
    dispatch(setAlert("Todo Updated", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TODO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};