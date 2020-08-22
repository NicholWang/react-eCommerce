import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './style.scss';
import Logo from '../../assets/logo.png';
import {auth} from './../../firebase/util';

const mapState = ({user}) => ({
  currentUser: user.currentUser
})
const Header = props => {
  const {currentUser} = useSelector(mapState);
  return (
  <header className="header">
    <div className="wrap">
      <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Simple Tut"/>
          </Link>
      </div>

      <div className="callToActions">
        {
          currentUser && (
            <ul>
              <li key={4}>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li key={3} onClick={() => auth.signOut()}>
                <span>LogOut</span>
              </li>
            </ul>
          )
        }
        {
          !currentUser && (
            <ul>
              <li key={1}>
                <Link to="/registration">Register</Link>
              </li>
              <li key={2}>
                <Link to="/login">LoginIn</Link>
              </li>
            </ul>
          )
        }
    </div>
    </div>
  </header>
)
}

Header.currentUser = null;



export default Header;