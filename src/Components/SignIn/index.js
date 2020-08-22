import React , {useState, useEffect} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import './style.scss'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import AuthWrapper from '../AuthWrapper'
import {signInUser,signInWithGoogle,resetAllAuthForms} from '../../redux/User/user.actions'


const mapState = ({user}) => ({
  signInSuccess: user.signInSuccess
})
const SignIn = props => {
  const {signInSuccess} = useSelector(mapState);
  const dispatch = useDispatch();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const resetForms = () => {
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if(signInSuccess){
      resetForms();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
  },[signInSuccess])
  const handleSubmit =  e => {
    e.preventDefault();
    dispatch(signInUser({email,password}))
  }
  const handleGoggleSign = () => {
    dispatch(signInWithGoogle())
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
                  <Button onClick={handleGoggleSign}>
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