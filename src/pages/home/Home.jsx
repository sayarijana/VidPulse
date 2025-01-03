import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'

export default function Home({sideBar}) {
  const [category,setCategory]=useState(0);


  return (
    <div>
      <Sidebar sideBar={sideBar} category={category} setCategory={setCategory}/>
      <div className={`container ${sideBar ? "":'large-container'}`}>
        <Feed category={category}/>
      </div>
      
    </div>
  )
}
