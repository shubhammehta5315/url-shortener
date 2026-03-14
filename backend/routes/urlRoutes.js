const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const router = express.Router();

// create short url
router.post("/shorten", async (req,res)=>{

 const {originalUrl}=req.body;

 const shortId=nanoid(6);

 const newUrl=new Url({
  originalUrl,
  shortId
 });

 await newUrl.save();

 const shortUrl=`${req.protocol}://${req.get("host")}/${shortId}`;

 res.json({shortUrl});

});

// get analytics list
router.get("/urls/all",async(req,res)=>{

 const urls=await Url.find().sort({createdAt:-1});

 res.json(urls);

});

module.exports=router;