import axios from 'axios';
import Config from '../../../../../../../../palmos/config';

const KEY = Config.API_KEY;

export default axios.create({
    baseURL:'https://googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults: 5,
        key: KEY
    }
});