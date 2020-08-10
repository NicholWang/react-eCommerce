import React , {Component} from 'react';
import './style.scss';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import {auth,handleUserProfile} from './../../firebase/util';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
}
class SignUp extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       ...initialState
    }
  }
  handleChange = e => {
    const {name,value} = e.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = async e => {
    e.preventDefault();
    const {displayName,email,password,confirmPassword} = this.state;

    if(password !== confirmPassword){
      const err = ['Password don\'t match'];
      this.setState({
        errors: err
      })
      return;
    }

    try{
      const {user} = await auth.createUserWithEmailAndPassword(email,password);
      console.log(user);
      await  handleUserProfile(user,{displayName});

      this.setState({
        ...initialState
      })
    }catch(err){

    }
  }
  render(){
    const {displayName,email,password,confirmPassword,errors} = this.state;
    return (
      <div className="signup">
        <div className="wrap">
          <h2>Register</h2>

          {
            errors.length > 0 && (
              errors.map((error,index) => {
                return (
                  <li key={index}>
                    {error}
                  </li>
                )
              })
            )
          }
          <form onSubmit={this.handleSubmit}>
            <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            placeholder="Full Name"/>

            <FormInput
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Email"/>

            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"/>

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleChange}
              placeholder="Confirm Password"/>

              <Button>
                Register
              </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp;