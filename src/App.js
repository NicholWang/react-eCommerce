import React ,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import './default.scss';
import './Components/Header/index';
import HomePage from './page/HomePage/index';
import Registration from './page/Registration';
import MainLayout from './Layouts/MainLayout';
import Recovery from './page/Recovery';
import Login from './page/Login';
import {auth,handleUserProfile} from './firebase/util';

const initialState = {
  currentUser: null
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;
  componentDidMount(){
    this.authListener = auth.onAuthStateChanged(async userAuth => {
     const userRef = await handleUserProfile(userAuth);
     if(userRef){
       userRef.onSnapshot(snapShot => {
         this.setState({
           currentUser:{
             id: snapShot.id,
             ...snapShot.data()
           }
         })
       })
     }

     this.setState({
       ...initialState
     })
    })
  }
  componentWillUnmount(){
    this.authListener();
  }
  render(){
    const {currentUser} = this.state;
    return (
      <div className="App">
          <Switch>
              <Route exact path="/" render={() => 
              <MainLayout currentUser={currentUser}>
                <HomePage/>
              </MainLayout>}/>
              <Route path="/registration" render={() => currentUser ? <Redirect to="/" /> :
                (<MainLayout currentUser={currentUser}>
                  <Registration/>
                </MainLayout>)}/>
              <Route path="/login" render={() => currentUser ? <Redirect to="/"/> : 
                (<MainLayout currentUser={currentUser}>
                    <Login/>
                  </MainLayout>)}/>
              <Route path="/recovery" render={() => (<MainLayout>
                <Recovery/>
              </MainLayout>)}/>
          </Switch>
      </div>
    );
  }
  
}

export default App;
