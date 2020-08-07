import React from 'react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const MainLayout = props => {
  return (
    <div className="fullHeight">
      <Header/>
      <div className="main">
        {props.children}
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout;