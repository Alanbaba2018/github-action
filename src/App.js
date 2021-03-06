import React from 'react'
import './App.css';
import { LockAmount, EveryIncrease, Kick, KickMoney } from './charts'

function App() {
  
  return (
    <div className="App">
      <div className="line-container">
        <LockAmount />
      </div>
      <div className="line-container">
        <EveryIncrease />
      </div>
      <div className="line-container">
        <Kick />
      </div>
      <div className="line-container">
        <KickMoney />
      </div>
    </div>
  );
}

export default App;
