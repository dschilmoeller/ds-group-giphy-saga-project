const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/:searchitem', (req, res) => {
    console.log('here is my request', req.params.searchitem)
    
   axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.params.searchitem}&limit=10`)
   .then((response) => {
    res.send(response.data)
   }).catch((error) => {
    console.log('error in our api search router', error)
    res.sendStatus(500)
   })
})


module.exports = router;