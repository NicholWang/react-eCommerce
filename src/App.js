import React from 'react';
import './default.scss';
import './Components/Header/index'
import Header from './Components/Header/index';
import HomePage from './page/HomePage/index'


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="main">
        <HomePage/>
      </div>
    </div>
  );
}

export default App;
