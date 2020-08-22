import React , {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import AuthWrapper from '../AuthWrapper';
import {withRouter} from 'react-router-dom';
import {FormInput,Button} from '../forms';
import {resetPassword,resetAllAuthForms} from '../../redux/User/user.actions'

const mapState = ({user}) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
})
const EmailPassword = props => {
  const {resetPasswordSuccess,resetPasswordError} = useSelector(mapState);
  const dispatch = useDispatch();
  const [email,setEmail] = useState('');
  const [error,setError] = useState([]);
  useEffect(() => {
    if(resetPasswordSuccess){
      dispatch(resetAllAuthForms());
      props.history.push('/login');
    }
  },[resetPasswordSuccess])

  useEffect(() => {
    if(Array.isArray(resetPasswordError) &&resetPasswordError.length > 0){
      setError(resetPasswordError);
    }
  },[resetPasswordError])
  const handleSubmit =  e => {
     e.preventDefault();
     dispatch(resetPassword({email}))
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