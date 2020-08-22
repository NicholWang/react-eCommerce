import userType from './user.types';
import {auth,handleUserProfile, GoogleProvider} from '../../firebase/util';

export const setCurrentUser = user => {
  return {
    type: userType.SET_CURRENT_USER,
    payload: user
  }
}

export const resetAllAuthForms = () => {
  return{
    type: userType.RESET_AUTH_FORMS
  }
}

export const signInUser = ({email, password}) => async dispatch => {
  try{
    // console.log(email,password)
    await auth.signInWithEmailAndPassword(email,password);
    dispatch({
      type: userType.SIGN_IN_SUCCESS,
      payload: true
    })
  }catch(err){

  }
}


export const signUpUser = ({displayName,email,password,confirmPassword}) => async dispatch => {
  if(password !== confirmPassword){
    const err = ['Password don\'t match'];
    dispatch({
      type: userType.SIGN_UP_ERROR,
      payload: err
    })
    return;
  }

  try{
    const {user} = await auth.createUserWithEmailAndPassword(email,password);
    console.log(user);
    await  handleUserProfile(user,{displayName});

    dispatch({
      type: userType.SIGN_UP_SUCCESS,
      payload: true
    })
    // resetForms();
    // props.history.push('/');
  }catch(err){

  }
}


export const resetPassword = ({email}) => async dispatch => {
  const config = {
      url: 'http://localhost:3000/login'
    };
    try{
      await auth.sendPasswordResetEmail(email,config)
        .then(() => {
          console.log('Password Reset');
          // props.history.push('/login');
          dispatch({
            type: userType.RESET_PASSWORD_SUCCESS,
            payload: true
          })
        }).catch(() => {
          console.log('Something went wrong');
          const err = ['Email not found. Please try again.'];
          dispatch({
            type: userType.RESET_PASSWORD_ERROR,
            payload: err
          })
        })
    }catch(err){

    }
}

export const signInWithGoogle = () => async dispatch => {
  try{
    await auth.signInWithPopup(GoogleProvider)
      .then(() => {
        dispatch({
          type: userType.SIGN_IN_SUCCESS,
          payload: true
        })
      })
  }catch(err){

  }
};
