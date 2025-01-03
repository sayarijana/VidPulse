import React from 'react'
import './Video.css'
import PlayVideo from '../../components/playVideo/PlayVideo'
import Recomend from '../../components/recomended/Recomend'
import { useParams } from 'react-router-dom'

export default function Video() {

  const {videoId,categoryId} =useParams();


  return (
   <div className='play-container'>
    <PlayVideo videoId={videoId}/>
    <Recomend categoryId={categoryId}/>
   </div>
  )
}
