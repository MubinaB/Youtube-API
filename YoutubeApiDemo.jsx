import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YoutubeApiDemo = () => {
    const [videos, setVideos] = useState([]);
    const API_KEY = 'AIzaSyDT4c9t7TFwcJAI8la0u5RyhaS-dT0AnRU';
    const CHANNEL_ID = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'; 

    const fetchVideos = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
            );
            setVideos(response.data.items);
            console.log(response.data.items);
        } catch (error) {
            console.error('Error fetching videos from YouTube API', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-evenly">
            {
            videos.length > 0 && (
                    <div className="col-md-12 p-4">
                        <h6>{videos[0].snippet.title}</h6>
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${videos[0].id.videoId}?autoplay=1&mute=1`} 
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="YouTube video player"
                        ></iframe>
                    </div>
                )}

                 <div className="row justify-content-evenly">
                {videos.map((video) => (
                    <div key={video.id.videoId} className="col-md-3 p-4">
                        <h6>{video.snippet.title}</h6>
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="img-fluid"
                        />
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default YoutubeApiDemo;
