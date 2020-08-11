import React , {Component} from 'react';
import AuthWrapper from '../AuthWrapper';
import {withRouter} from 'react-router-dom'
import {FormInput,Button} from '../forms';
import {auth} from '../../firebase/util';


const initialState = {
  email: '',
  error: []
}
class EmailPassword extends Component{
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    }
  }

  handleChange = e => {
    const { name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async e => {
    const {email} = this.state;
    const config = {
      url: 'http://localhost:3000/login'
    };
    e.preventDefault();
    try{
      await auth.sendPasswordResetEmail(email,config)
        .then(() => {
          console.log('Password Reset');
          this.props.history.push('/login');
        }).catch(() => {
          console.log('Something went wrong');
          const err = ['Email not found. Please try again.'];
          this.setState({
            error: err
          })
        })
    }catch(err){

    }
  }
  render(){
    const {email,error} = this.state;
    const configAuthWrapper = {
      headline: 'Email Password'
    }
    return(
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {
            error.length > 0 && (
              <ul>
            { error.map((err,index) => {
               return (
                 <li key={index}>
                   {err}
                 </li>
               )
             })}
             </ul>
            )
          }
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Button type="submit">
              Email Password
            </Button>
          </form>
        </div>
      </AuthWrapper>
    )
  }
}

export default withRouter(EmailPassword);