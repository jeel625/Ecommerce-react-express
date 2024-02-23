import React from 'react'
import '../Navbar/Navbar.css'
import navLogo from '../../assets/nav-logo.svg'
import profile_pic from '../../assets/admin-profile.jpg'
import down_arrow from '../../assets/DonwArrow.jpg'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navLogo} alt="" className='nav-logo'/>
        <div className="profile-arrow">
          <img src={profile_pic} alt=""  className='nav-profile'/>
          <img src={down_arrow} alt=""  className='nav-down-arrow'/>
        </div>
    </div>
  )
}
