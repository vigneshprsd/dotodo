import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodos } from "../../actions/todo";
import Modal from 'react-modal';

const customStyles = {
  content : {
    padding               : "12px",
    top                   : '50%',
    left                  : '50%',
    right                 : '15%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
const TodoForm = ({ addTodos,isModalOpen,openModal }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  return (
    <Modal isOpen={isModalOpen}
    onRequestClose={openModal}
    style={customStyles}>
      <div class="post-form">
        <h4>ADD NEW TODO</h4>
      <form class="form my-1" onSubmit={e=>{
          e.preventDefault();
          addTodos({title,text});
          openModal()
          setText('');
          setTitle('');
      }}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          placeholder="Title"
          required
        />
        <textarea
          name="text"
          value={text}
          cols="30"
          rows="7"
          required
          placeholder="Create a TODO"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input  type="submit" class="btn btn-dark my-1" value="ADD NEW TODO" />
      </form>
    </div>
    </Modal>
  );
};

TodoForm.propTypes = {
  addTodos: PropTypes.func.isRequired,
};

export default connect(null, { addTodos })(TodoForm);
