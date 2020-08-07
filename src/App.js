import React from 'react';
import {Route,Switch} from 'react-router-dom';
import './default.scss';
import './Components/Header/index'
import HomePage from './page/HomePage/index'
import Registration from './page/Registration';
import MainLayout from './Layouts/MainLayout'


function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path="/" render={() => 
            <MainLayout>
              <HomePage/>
            </MainLayout>}/>
            <Route path="/registration" render={() =>
            <MainLayout>
              <Registration/>
            </MainLayout>}/>
        </Switch>
    </div>
  );
}

export default App;
