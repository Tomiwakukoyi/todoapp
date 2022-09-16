import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `cursor-pointer ml-2 line-through`,
  button: `cursor-pointer flex items-center`,
};
//toggle complete is for when the user clciks the text or checkbox
const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    //what this line is saying is if todo.completed is true
    //then render style.licompleted else render style.li
    //this type of code is called ternary operator
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        {/* same hing here,  if todo.comleted is true then checked(to check the box)
        else leave open '' for unchecked box */}
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />

        {/* onClick we pass in the toggleCompletefunction and pass todo as 
        a parameter */}
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo.text}
        </p>
      </div>
      {/* onclick of the delet  icon, delete todo then the todo.id is the exact one we want to delete */}
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Todo;
