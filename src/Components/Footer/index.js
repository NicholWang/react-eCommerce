import React from 'react';
import './style.scss'

const Footer = props => {
  return(
    <footer className="footer">
      <div className="wrap"
      dangerouslySetInnerHTML={{__html: '&copy; SimpleTut 2020'}}></div>
    </footer>
  )
}

export default Footer;