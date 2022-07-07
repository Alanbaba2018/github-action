import React from 'react'
import './App.css';
import { LockAmount, EveryIncrease } from './charts'

function App() {
  
  return (
    <div className="App">
      <div className="line-container">
        <LockAmount />
      </div>
      <div className="line-container">
        <EveryIncrease />
      </div>
    </div>
  );
}

export default App;
