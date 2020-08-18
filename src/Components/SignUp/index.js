import React , {useState} from 'react';
import {withRouter} from 'react-router-dom';
import './style.scss';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import {auth,handleUserProfile} from './../../firebase/util';
import AuthWrapper from '../AuthWrapper';


const SignUp = props => {
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
  const handleSubmit = async e => {
    e.preventDefault();

    if(password !== confirmPassword){
      const err = ['Password don\'t match'];
      setErrors(...errors,err);
      return;
    }

    try{
      const {user} = await auth.createUserWithEmailAndPassword(email,password);
      console.log(user);
      await  handleUserProfile(user,{displayName});
      resetForms();
      props.history.push('/');
    }catch(err){

    }
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