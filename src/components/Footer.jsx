import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentDate = new Date(Date.now())

  return (
    <footer className='footer'>
        <div className="footerContent">
            <Link to="/" className='footerTitle'><h1>Food App</h1></Link>
            <p className='footerCopyRight'>© {currentDate.getFullYear()} Food App. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer