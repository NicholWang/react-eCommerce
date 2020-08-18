import React , {useState} from 'react';
import AuthWrapper from '../AuthWrapper';
import {withRouter} from 'react-router-dom'
import {FormInput,Button} from '../forms';
import {auth} from '../../firebase/util';


const EmailPassword = props => {
  const [email,setEmail] = useState('');
  const [error,setError] = useState([]);
  const handleSubmit = async e => {
    const config = {
      url: 'http://localhost:3000/login'
    };
    e.preventDefault();
    try{
      await auth.sendPasswordResetEmail(email,config)
        .then(() => {
          console.log('Password Reset');
          props.history.push('/login');
        }).catch(() => {
          console.log('Something went wrong');
          const err = ['Email not found. Please try again.'];
          setError(...err);
        })
    }catch(err){

    }
  }
 
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
          <form onSubmit={handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Button type="submit">
              Email Password
            </Button>
          </form>
        </div>
      </AuthWrapper>
    )
  }
export default withRouter(EmailPassword);