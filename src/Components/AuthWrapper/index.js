import React from 'react';
import './style.scss'

const AuthWrapper = ({headline,children}) => {
  return (
    <div className="authWrap">
      <div className="wrap">
        {headline && <h2>{headline}</h2>}
        {children}
      </div>
    </div>
  )
}

export default AuthWrapper;