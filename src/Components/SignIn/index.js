import React , {useState} from 'react'
import {Link,withRouter} from 'react-router-dom'
import './style.scss'
import Button from '../forms/Button'
import { signInWithGoogle, auth } from './../../firebase/util'
import FormInput from '../forms/FormInput'
import AuthWrapper from '../AuthWrapper'



const SignIn = props => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const resetForms = () => {
    setEmail('');
    setPassword('');
  }
  const handleSubmit = async e => {
    e.preventDefault();
    try{
      console.log(email,password)
      await auth.signInWithEmailAndPassword(email,password);
      resetForms();
      props.history.push('/');
    }catch(err){

    }
  }
    const configAuthWrapper = {
      headline: 'LogIn'
    }
    return (
      <AuthWrapper {...configAuthWrapper}>
          <div className="formWrap">
            <form onSubmit={handleSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
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
              <div className="links">
                <Link to="/recovery">
                  Reset Password
                </Link>
              </div>
            </form>
          </div>
      </AuthWrapper>
    )
  }

export default withRouter(SignIn);