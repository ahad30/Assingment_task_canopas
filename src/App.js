import React, { useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

firebase.initializeApp(firebaseConfig);


function TodoApp() {

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const handleLogIn = () => {
    const logIn = document.getElementById('log-in-area');
    logIn.style.display = 'none';
    const todos = document.getElementById('todos-area');
    todos.style.display = 'block';

   signInWithPopup(auth, provider)
  .then((result) => {
    const {displayName, photoUrl ,email} = result.user;
    console.log(displayName, photoUrl ,email);
  })
  }

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState({ index: null, text: ''});

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  }

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  const editTaskText = (index) => {
    if (editTask.text.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editTask.text;
      setTasks(updatedTasks);
      setEditTask({ index: null, text: '' });
    }
  }

  return (

<>

{/* before log in */}

    <div id="log-in-area" className='container'>
        <h1 class="text-center mt-5">Welcome to Todo list</h1>
        <div class="mt-5  submit-area p-5 text-center">
            <h3 class="mb-2">Log in</h3>
            <div class="row justify-content-center">
                <div class="col-md-10 mb-3">
                    <input type="text" class="form-control" id="staticEmail" value="" placeholder="email"/>
                </div>
                <div class="col-md-10">
                    <input type="password" class="form-control" id="inputPassword" placeholder="password"/>
                </div>
            </div>
            <div className='text-center'><button id="log-in" class="btn btn-primary rounded mt-3" >Log in</button></div>
            <div className='mt-3 text-center'><h4>OR</h4></div>
           <div className='text-center'><button id="log-in" class="btn btn-primary rounded mt-3" onClick={handleLogIn}>Sign up with google</button>
           </div> 
        </div>
    </div>

{/* After log in */}
    <div id='todos-area' className="container mt-5 bg-light">
    <h1 className="mb-4 text-center">Add your todos below</h1>
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="New task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-primary ms-3" onClick={addTask}>
          Add Task
        </button>
      </div>
    </div>
    <ul className="list-group">
      {tasks.map((task, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between">
          {editTask.index === index ? (
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={editTask.text}
                onChange={(e) => setEditTask({ index, text: e.target.value })}
              />
              <div className="input-group-append">
                <button className="btn btn-success ms-3" onClick={() => editTaskText(index)}>
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              {task}
              <div className="btn-group">
                <button className="btn btn-danger me-3 ms-3" onClick={() => removeTask(index)}>
                  Delete
                </button>
                <button className="btn btn-warning" onClick={() => setEditTask({ index, text: task })}>
                  Edit
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
</>
  );

}

export default TodoApp;
