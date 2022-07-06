import React from 'react'
import './App.css';
import { LockAmount } from './charts'

function App() {
  
  return (
    <div className="App">
      <div className="line-container">
        <LockAmount />
      </div>
      <div className="line-container">
        <LockAmount />
      </div>
      <div className="line-container">
        <LockAmount />
      </div>
      <div className="line-container">
        <LockAmount />
      </div>
    </div>
  );
}

export default App;
