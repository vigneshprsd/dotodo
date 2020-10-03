import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTodos, deleteTodos } from "../../actions/todo";
import TodoForm from "./TodoForm";
import Moment from 'react-moment'

const Todos = ({ getTodos, deleteTodos, todo: { todos, loading } }) => {
  const [openTodo, setOpenTodo] = useState(false);

  const openModal = () => {
    setOpenTodo(!openTodo);
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      <button onClick={() => openModal()} className="btn btn-success">
        ADD NEW TODO
      </button>
      <TodoForm isModalOpen={openTodo} openModal={openModal} />
      {todos.map((m) => (
        <table
          className="todolist"
          style={{ width: "100%", textAlign: "left" }}
          key={m._id}
        >
          <thead>
            <tr>
              <th>{m.title}</th>
              <td style={{ textAlign: "right" }}>
                <button
                  onClick={(e) => deleteTodos(m._id)}
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <i className="fas fa-times-circle"></i>
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>{m.text}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td  colSpan={2}>Date : <Moment format='DD/MM/YYYY'>{m.date}</Moment> </td>
            </tr>
          </tfoot>
        </table>
      ))}
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
