import React , {useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import './style.scss';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';
import {signUpUser,resetAllAuthForms} from '../../redux/User/user.actions'

const mapState = ({user}) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})
const SignUp = props => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName,setDisplayName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [errors,setErrors] = useState([]);

  const resetForms = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }

  useEffect(() => {
    if(signUpSuccess){
      resetForms();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
  },[signUpSuccess])
  useEffect(() => {
    if(Array.isArray(signUpError) && signUpError.length > 0){
      setErrors(signUpError)
    }
  },[signUpError])
  const handleSubmit =  e => {
    e.preventDefault();
    dispatch(signUpUser({
      displayName,
      email,
      password,
      confirmPassword
    }))
   
  }

    const configAuthWrapper = {
      headline: 'Register'
    }
    return (
      <AuthWrapper {...configAuthWrapper}>
          <form onSubmit={handleSubmit}>
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
            <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="Full Name"/>

            <FormInput
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"/>

            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"/>

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"/>

              <Button>
                Register
              </Button>
          </form>
        </AuthWrapper>
    )
  }

export default withRouter(SignUp);