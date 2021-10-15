const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config('');

const app = express();

console.log(process.env.REACT_APP_APP_NAME)

app.use(cors());
app.use(express.json());

app.get('/search', (rq, rs) => {

    var options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
        params: {q:rq.query.data, lang: 'en', media: 'True'},
        headers: {
          'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_NEWS_API
        }
    };

    axios.request(options).then(res => {
        setTimeout(() => {
            rs.status(200).json([res.data])
        },Math.random() * 2500)
    })
    .catch(err => {
        rs.status(404).json([{err:err}])
    })
});

app.listen(8080, () => {
    console.log('app listening')
});