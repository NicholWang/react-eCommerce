import userType from './user.types';

const initialState = {
  currentUser: null,
  signInSuccess: false,
  signUpSuccess: false,
  signUpError: [],
  resetPasswordSuccess: false,
  resetPasswordError: [],
}

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case userType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case userType.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload
      }
    case userType.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload
      }
    case userType.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.payload
      }
    case userType.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload
      }
    case userType.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordError: action.payload
      }
    case userType.RESET_AUTH_FORMS:
      return {
        ...state,
        signInSuccess: false,
        signUpSuccess: false,
        signUpError: [],
        resetPasswordSuccess: false,
        resetPasswordError: []
      }
    default:
      return state;
  }
}

export default userReducer;