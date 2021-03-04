const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const fs = require("fs").promises;


router.get('/data', (req,res) => {
    console.log('in data apiu', req.user)
    res.sendStatus(200);
    res.end();
})

module.exports = router;