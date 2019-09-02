import axios from 'axios';
import API_KEY from '../config.js';

const KEY = API_KEY;

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
});