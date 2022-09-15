import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";

const style = {
  bg: ` h-screen w-full p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0] `,
  container: `bg-slate-100 max-w-[500px] w-full m-auto shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
};

function App() {
  //creating the state for the todos
  const [todos, setTodos] = useState(["learn react", "play football"]);
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form className={style.form}>
          <input className={style.input} type="text" placeholder="Add todo" />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => {
            return <Todo key={index} todo={todo} />;
          })}
        </ul>
        <p className={style.count}>You have 2 todos</p>
      </div>
    </div>
  );
}

export default App;
