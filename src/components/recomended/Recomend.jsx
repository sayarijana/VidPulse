import React, { useEffect, useState ,useCallback} from 'react'
import './Recomend.css'
import { API_KEY, valueConverter } from '../../data'
import { Link } from 'react-router-dom';


export default function Recomend({categoryId}) {
    const [apiData,setApiData]=useState([]);

    const fetchData = useCallback(async () => {
        const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(relatedVideoUrl)
            .then(res => res.json())
            .then(data => setApiData(data.items));
    }, [categoryId]); // Add categoryId as a dependency

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Add fetchData as a dependency



  return (
    <div className='recomended'>

        {
            apiData.map((item,index)=>(
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{valueConverter(item.statistics.viewCount)} views</p>
                    </div>
                </Link>
            ))
        }       
      
    </div>
  )
}
