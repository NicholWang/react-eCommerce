import React , {Component} from 'react'
import './style.scss'
import Button from '../forms/Button'
import { signInWithGoogle, auth } from './../../firebase/util'
import FormInput from '../forms/FormInput'


const initialState = {
  email: '',
  password: ''
}
class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    }
  }
  handleSubmit = async e => {
    const { email, password } = this.state;
    e.preventDefault();
    try{
      await auth.signInWithEmailAndPassword(email,password);

      this.setState({
        ...initialState
      })
    }catch(err){

    }
  }
  handleChange = e => {
    const {name,value} = e.target;

    this.setState({
      [name]: value
    })
  }
  render(){
    const { email, password } = this.state;
    return (
      <div className="signin">
        <div className="wrap">
          <h2>LoginIn</h2>
  
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}/>
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}/>
              <Button type="submit">
                Login
              </Button>
              <div className="socialSignin">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
 
}

export default SignIn;