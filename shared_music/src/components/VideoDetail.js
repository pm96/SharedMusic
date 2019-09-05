import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

const VideoDetail = ({video}) => {
    if(!video){
        return (
            <Card fluid>
                <Card.Content>
                    <Placeholder fluid>
                        <Placeholder.Image square />
                    </Placeholder>
                </Card.Content>
            </Card>);
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`;

    return (
        <div>
            <div className="ui segment">
                <div className="ui embed">
                    <iframe src={videoSrc} title={video.snippet.title} allow='autoplay'/>
                </div>
            </div>
            <div className="ui segment">
                <h4 className="ui header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>
    );
}

export default VideoDetail;