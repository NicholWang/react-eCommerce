import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Logo from '../../assets/logo.png';

const Header = props => {
  return (
  <header className="header">
    <div className="wrap">
      <div className="logo">
          <Link to="/">
            <img src={Logo}/>
          </Link>
      </div>

      <div className="callToActions">
      <ul>
        <li key={1}>
          <Link to="/registration">Register</Link>
        </li>
      </ul>
    </div>
    </div>
  </header>
)
}

export default Header;