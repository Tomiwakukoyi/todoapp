import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./firebase";
import {
  onSnapshot,
  query,
  collection,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  //former color:bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]
  //fmr container color:bg-slate-100
  //fmr button color : bg-purple-500
  bg: ` h-screen w-full p-4 bg-purple-500 `,
  container: `bg-slate-100 max-w-[500px] w-full m-auto shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 `,
  count: `text-center p-2`,
};

function App() {
  //creating the state for the todos
  const [todos, setTodos] = useState([]);
  //setting the use state to an empty value/default value
  const [input, setInput] = useState("");

  //create todo
  const createTodo = async (e) => {
    //e.prevent default to prevent the page from reloading
    //when we submit a form
    e.preventDefault(e);
    if (input === "") {
      alert("please enter a valid todo");
      //addding this return stops the code after the alert so
      // it doesnt keep running and ovver loading the database
      return;
    }
    //addDoc is a firebase method too and should be imported at the top
    //addDoc into the collection of database(db) called todoapp
    await addDoc(collection(db, "todoapp"), {
      text: input,
      completed: false,
    });
    //to make the input field clear after submitting
    setInput("");
  };
  //read todo in firebase
  useEffect(() => {
    //const q is connecting the useEffect to our firebase database
    //the db is in the firebase.js file while 'todoapp' is the name of
    //our collectioon where the items are
    const q = query(collection(db, "todoapp"));
    //the onsnapshot is like taking a picture of our firebase and printing it the screen for us
    //the q is were passing is the cons q on ln 28 whcih is the snapshot we want to see from the db
    //querySnapshot is the combination f the query on ln 28 and the snapshot method
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //creating the empty todos array where well later push items into
      let todosArr = [];
      //doc is not a keyword, it can be named anything
      querySnapshot.forEach((doc) => {
        //id is the id of the our array
        //todosArr.push is pushing the items in ({ ...doc.data(), id: doc.id }) into the empty todos arr in ln37
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      //this is setting the setTodos to our array
      setTodos(todosArr);
    });
    return () => unsubscribe();
    //dependecy array so the code doesnt just keep running, the code just runs once and never again
    //used in useEffect hooks
  }, []);

  //update todo in firebase
  //this todo passed is the todo from the onchange function in the todo.js

  const toggleComplete = async (todo) => {
    //updateDoc is a firebase method and has to be imoported also

    //were accessing the doc using updateDoc method then we look for db,then we access ther todoapp then the id of the
    // document were updating which we access through todo.id
    await updateDoc(doc(db, "todoapp", todo.id), {
      //were toggling the completed soo were changing the boolean value from false totrue and vice-versa
      completed: !todo.completed,
    });
  };
  //delete todo
  //////////////////////
  const deleteTodo = async (id) => {
    //delete doc is the firebase method for deleteing documents from the db
    //deleteDoc doc database named todo app with id of id
    await deleteDoc(doc(db, "todoapp", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          {/* whenever the form is c=submitted its going to take the value inside the input form
          and store it inside the state called input */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add todo"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => {
            return (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
