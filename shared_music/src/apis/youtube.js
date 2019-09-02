import axios from 'axios';
import Config from '../../../../../../../../palmos/config';

const KEY = 'API key goes here';

export default axios.create({
    baseURL:'https://googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults: 5,
        key: KEY
    }
});
