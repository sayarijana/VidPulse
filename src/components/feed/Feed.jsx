import React, { useEffect, useState, useCallback } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, valueConverter } from '../../data'
import moment from 'moment';

export default function Feed({ category }) {
  const [data, setData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null); // State for tracking pagination


  const fetchData = useCallback( async (pageToken = '') => {
    const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
    try {
      const response = await fetch(videoListUrl);
      const result = await response.json();
      if (result.items) {
        setData((prevData) => [...prevData, ...result.items]); // Append new videos to the existing list
        setNextPageToken(result.nextPageToken|| null); // Save the nextPageToken for future requests
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [category]); // Only recreate fetchData when category changes


  useEffect(() => {
    setData([]);
    setNextPageToken(null);
    fetchData();
  }, [fetchData, category]);

  

  // Handler to load more videos when the button is clicked
  const clickHandler = () => {
    if (nextPageToken) {
      fetchData(nextPageToken); // Fetch videos using the nextPageToken
    }
  }

  return (
    <div className='feed'>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='card'>
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {valueConverter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))
        ) : (
            <p>No videos found.</p>
        )}

        {nextPageToken && (
             // Show the button if there is a next page
            <div className='btn'>
                <button onClick={clickHandler}>Load More...</button>
            </div>            
        )}

    
    </div>
  );
}
