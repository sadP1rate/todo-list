import React from 'react';
import logo from './logo.svg';
import './App.scss';
import ToDoList from './ToDoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ToDoList />
      </header>
    </div>
  );
}

export default App;
