import React ,{useEffect} from 'react';
import {Route,Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import './default.scss';
import './Components/Header/index';
import HomePage from './page/HomePage/index';
import Registration from './page/Registration';
import MainLayout from './Layouts/MainLayout';
import Recovery from './page/Recovery';
import Login from './page/Login';
import Dashboard from './page/Dashboard'
import {auth,handleUserProfile} from './firebase/util';
import {setCurrentUser} from './redux/User/user.actions'
import WithAuth from './HOC/withAuth'


const App = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
     const userRef = await handleUserProfile(userAuth);
     if(userRef){
       userRef.onSnapshot(snapShot => {
        dispatch( setCurrentUser({
          id: snapShot.id,
          ...snapShot.data()
        }))
       })
     }
     dispatch(setCurrentUser(userAuth))
     return () => {
       authListener();
     }
    })
  },[])


    return (
      <div className="App">
          <Switch>
              <Route exact path="/" render={() => 
              <MainLayout>
                <HomePage/>
              </MainLayout>}/>
              <Route path="/registration" render={() =>(<MainLayout>
                  <Registration/>
                </MainLayout>)}/>
              <Route path="/login" render={() =>(<MainLayout>
                    <Login/>
                  </MainLayout>)}/>
              <Route path="/recovery" render={() => (<MainLayout>
                <Recovery/>
              </MainLayout>)}/>

              <Route path="/dashboard" render={() => (
                <WithAuth>
                    <MainLayout>
                      <Dashboard/>
                    </MainLayout>
             </WithAuth>)}/>
          </Switch>
      </div>
    );
  }

export default App;
