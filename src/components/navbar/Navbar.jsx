import React from 'react'
import './Navbar.css'
import { IoIosMenu } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import uploadIcon from  '../../assets/uplo.webp';
import { Link } from 'react-router-dom';
import megan from '../../assets/megan.png'
 


export default function Navbar({setSideBar}) {
  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <IoIosMenu className='menu-icon'
            onClick={()=>setSideBar((prev )=> prev===false?true:false)}/>
            <Link to='/' className='flex-div logo-div'>
                <FaYoutube color="red" className='logo-icon'/>
                <span className='logo-name'>VidPulse</span>
            </Link>
                       
        </div>

        <div className='nav-middle flex-div'>
            <div className='search-box flex-div'>
                <input type='text' placeholder='search'/>
                <div className='search-icondiv'>
                    <IoSearchOutline className='search-icon'/>
                </div>
            </div>
            <div className='mic-div'>
                <IoMdMic className='mic-icon' />
            </div>
            
        </div>

        <div className='nav-right flex-div'>
            <img src={uploadIcon} alt='' className='upload-icon'/>           
            <IoNotificationsOutline className='notification-icon'/>
            <img src={megan} alt="" className='profile-icon'/>
        </div>
    </nav>
  )
}
