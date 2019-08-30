import axios from 'axios';

const KEY = 'AIzaSyCUCZoztUM3c1bc7lSWJDahhZuIb1D3t5w';

export default axios.create({
    baseURL:'https://googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults: 5,
        key: KEY
    }
});