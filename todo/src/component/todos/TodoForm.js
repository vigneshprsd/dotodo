import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodos,editTodo } from "../../actions/todo";
import Modal from "react-modal";
import { useEffect } from "react";

const customStyles = {
  content: {
    padding: "12px",
    top: "50%",
    left: "50%",
    right: "15%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


const TodoForm = ({ addTodos,editTodo, isModalOpen, openModal, editFormData , clearEditFormData }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  let titleText = "Add new todo"
  if(editFormData !== undefined)
  {
    titleText = "Update todo"
  }


useEffect(()=>{
  Modal.setAppElement('body');
},[]);

  return (
    <Modal isOpen={isModalOpen} onRequestClose={()=>{openModal(); clearEditFormData()}} style={customStyles}>
      <div className="post-form">
  <h4 className="text-orange-500">{titleText}</h4>
        <form
          className="form my-1 bg-transparent"
          onSubmit={(e) => {
            e.preventDefault();
            if(editFormData !== undefined){
              console.log('working');
              let id = editFormData.id;
              editTodo({id, title, text });
              clearEditFormData();
            }else{
              addTodos({ title, text });
            }
            openModal();
            setText("");
            setTitle("");
          }}
        >
          <input
            style={{ color: "white", border: "none" }}
            className="bg-transparent bsinput"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            placeholder="Title"
            required
          />
          <textarea
            style={{ color: "white", border: "none" }}
            className="bg-transparent mt-3 bsinput"
            name="text"
            value={text}
            cols="30"
            rows="7"
            required
            placeholder="Create a TODO"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input
            type="submit"
            className="text-orange-500 bg-transparent border border-solid border-orange-500 hover:bg-orange-500 hover:text-black active:bg-orange-600 font-regular uppercase text-sm px-4 py-4 rounded outline-none focus:outline-none ml-1 mb-1 mt-3"
            value={titleText}
          />
        </form>
      </div>
    </Modal>
  );
};

TodoForm.propTypes = {
  addTodos: PropTypes.func.isRequired,
  editTodo:PropTypes.func.isRequired,
};

export default connect(null, { addTodos,editTodo })(TodoForm);
