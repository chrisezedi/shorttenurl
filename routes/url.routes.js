//required packeges
const express = require("express");
const router = express.Router();
const Url = require("../models/url");

//get route
router.get('/', (req,res) => {
    res.redirect('/graphql');
});

//shortenurl route
router.get('/:shorturl', async (req,res) => {
    const urls = await Url.getUrls();
    const url = urls.find(url => url.short === `${process.env.BASE_DEV_URL}${req.params.shorturl}`);
    !url ? res.status(404).send("invalid url")
        : res.redirect(url.full); 
  });

module.exports = router;