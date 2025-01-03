import React, { useEffect, useState, useCallback } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, valueConverter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

export default function PlayVideo() {

    const {videoId}=useParams();

    const [apiData,setApiData]=useState(null);
    const [channelData,setChannelData]=useState(null);
    const [commentData,setCommentData]=useState([]);

    const fetchVideoData = useCallback(async () => {
        const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&regionCode=IN&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetailsUrl)
            .then((res) => res.json())
            .then((data) => setApiData(data.items[0]));
    }, [videoId]); // Add videoId as dependency
    

    const fectOtherData = useCallback(async () => {
        if (apiData && apiData.snippet) {
            // Fetching channel data
            const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
            const channelResponse = await fetch(channelDataUrl);
            const channelData = await channelResponse.json();
            setChannelData(channelData.items[0]);
    
            // Fetching comment data
            const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
            const commentResponse = await fetch(commentUrl);
            const commentData = await commentResponse.json();
            setCommentData(commentData.items || []);
        }
    }, [apiData, videoId]); // Add apiData and videoId as dependencies
    

    useEffect(() => {
        fetchVideoData();
    }, [fetchVideoData]);


    useEffect(() => {
        fectOtherData();
    }, [fectOtherData]);

     // Scroll to the top when the videoId changes
     useEffect(() => {
        window.scrollTo(0, 0);  // Scroll to the top of the page
    }, [videoId]);  // Runs whenever videoId changes



  return (
    <div className='play-video'>
        <iframe 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        title="YouTube video player"
        ></iframe>
        <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
        <div className="play-video-info">
            <p>{apiData?valueConverter(apiData.statistics.viewCount ):"16K"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
            <div >
                <span><img src={like} alt="" />{apiData?valueConverter(apiData.statistics.likeCount):155}</span>
                <span><img src={dislike} alt="" /> </span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr/>
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url :""} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle : ""}</p>
                <span>{channelData? valueConverter(channelData.statistics.subscriberCount) :"1M"} subscribers</span>
            </div>

            <button>Subscribe</button>            
        </div>
        <div className="vid-description">
            <p>{apiData?apiData.snippet.description.slice(0,250) :"Description here"}</p>
            <hr />
            <h4>{apiData?valueConverter(apiData.statistics.commentCount):102} comments</h4>

            {
                commentData.map((item,index)=>(
                    <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                             <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>

                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>           

                ))
            }

        </div>   
      
    </div>
  )
}
