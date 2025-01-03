import React from 'react'
import './Sidebar.css'
import { MdHome } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa6";
import { IoMdBasketball } from "react-icons/io";
import { GrTechnology } from "react-icons/gr";
import { MdLibraryMusic } from "react-icons/md";
import { LiaNewspaperSolid } from "react-icons/lia";
import { FiTv } from "react-icons/fi";
import { LiaBlogSolid } from "react-icons/lia";
import jack from '../../assets/jack.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'

export default function Sidebar({sideBar,category,setCategory}) {
  return (
    <div className= {`sidebar ${sideBar ?"" :"small-sidebar"}`}>
    <div className='shortcut-links'>
      <div className={`side-link ${category===0?"active":""}`} onClick={()=>setCategory(0)}>
        <MdHome className='icons'/>
        <p>Home</p>
      </div>
      <div className={`side-link ${category===20?"active":""}`} onClick={()=>{console.log("Gaming clicked"); setCategory(20)}}>
        <IoGameController className='icons'/>
        <p>Gaming</p>
      </div>
      <div className={`side-link ${category===2?"active":""}`} onClick={()=>setCategory(2)}>
        <FaCarSide className='icons'/>
        <p>Automobiles</p>
      </div>
      <div className={`side-link ${category===17?"active":""}`} onClick={()=>setCategory(17)}>
        <IoMdBasketball className='icons'/>
        <p>Sports</p>
      </div>
      <div className={`side-link ${category===24?"active":""}`} onClick={()=>setCategory(24)}>
        <FiTv className='icons'/>
        <p>Entertainment</p>
      </div>
      <div className={`side-link ${category===28?"active":""}`} onClick={()=>setCategory(28)}>
        <GrTechnology className='icons'/>
        <p>Technology</p>
      </div>
      <div className={`side-link ${category===10?"active":""}`} onClick={()=>setCategory(10)}>
        <MdLibraryMusic className='icons'/>
        <p>Music</p>
      </div>
      <div className={`side-link ${category===22?"active":""}`} onClick={()=>setCategory(22)}>
        <LiaBlogSolid className='icons'/>
        <p>Blogs</p>
      </div>
      <div className={`side-link ${category===25?"active":""}`} onClick={()=>setCategory(25)}>
        <LiaNewspaperSolid className='icons'/>
        <p>News</p>
      </div>
      <hr/>
    </div>

    <div className='subscribed-list'>
        <h3>Subscribed</h3>
        <div className='side-link'>
            <img src={jack} alt="" />
            <p>PewDiePie</p>
        </div>
        <div className='side-link'>
            <img src={simon} alt="" />
            <p>MrBeast</p>
        </div>
        <div className='side-link'>
            <img src={tom} alt="" />
            <p>Justin Biebar</p>
        </div>
        <div className='side-link'>
            <img src={megan} alt="" />
            <p>5-minute Crafts</p>
        </div>
        <div className='side-link'>
            <img src={cameron} alt="" />
            <p>Nas Daily</p>
        </div>


    </div>
    
  </div>
  )
}
