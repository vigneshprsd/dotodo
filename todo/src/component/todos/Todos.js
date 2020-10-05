import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTodos, deleteTodos } from "../../actions/todo";
import TodoForm from "./TodoForm";
import Moment from "react-moment";
import { Loading } from "../Loader/Loading";

const Todos = ({ getTodos, deleteTodos, todo: { todos, loading } }) => {
  const [openTodo, setOpenTodo] = useState(false);
  const [editFormData, setEditFormData] = useState();

  const openModal = () => {
    setOpenTodo(!openTodo);
  };

  const clearEditFormData = () => {
    setEditFormData();
  };

  const handleEdit = (id, title, text) => {
    setOpenTodo(true);
    setEditFormData({ id, title, text });
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <button
        onClick={() => openModal()}
        className="text-orange-500 bg-transparent border border-solid border-orange-500 hover:bg-orange-500 hover:text-black active:bg-orange-600 font-regular uppercase text-sm px-4 py-4 rounded outline-none focus:outline-none ml-1 mb-1"
      >
        ADD NEW TODO
      </button>
      <TodoForm
        isModalOpen={openTodo}
        clearEditFormData={clearEditFormData}
        editFormData={editFormData}
        openModal={openModal}
      />
      <div className="todomaincontainer mt-2">
        {todos.map((m) => (
          <div key={m._id} className="todolist">
            <h5 className="text-orange-500 uppercase">
              {m.title}{" "}
              <span className="float-right">
                <Moment format="DD/MM/YYYY">{m.date}</Moment>
              </span>
            </h5>
            <p className="break-words py-1">{m.text}</p>
            <div className="text-orange-500" style={{ width: "100px" }}>
              <button
                className="mr-3"
                onClick={() => handleEdit(m._id, m.title, m.text)}
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <i className="fa fa-edit" aria-hidden="true"></i>
              </button>
              <button
                onClick={(e) => deleteTodos(m._id)}
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <i className="fa fa-trash-alt" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Todos.propTypes = {
  getTodos: PropTypes.func.isRequired,
  deleteTodos: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todo: state.todo,
});

export default connect(mapStateToProps, { getTodos, deleteTodos })(Todos);
