import React, {useRef} from 'react';
import './App.css';
import {Context} from './components/Context'
import Board from './components/Board'

function App() {

  const canvas = useRef(null);

  


  return (
    <Context.Provider value={{canvas}}>
      <Board />
    </Context.Provider>
  );
}




export default App;
