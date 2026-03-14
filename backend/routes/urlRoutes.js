const express = require("express");
const { nanoid } = require("nanoid");

const Url = require("../models/Url");

const router = express.Router();


router.post("/shorten", async (req,res)=>{

 try{

 const {originalUrl}=req.body;

 if(!originalUrl){
 return res.status(400).json({error:"URL required"});
 }

 const shortId=nanoid(6);

 const newUrl=new Url({
 originalUrl,
 shortId
 });

 await newUrl.save();

 const shortUrl=`${req.protocol}://${req.get("host")}/${shortId}`;

 res.json({shortUrl});

 }catch(error){

 res.status(500).json({error:"Server error"});

 }

});

router.get("/urls/all",async(req,res)=>{

 try{

 const urls=await Url.find().sort({createdAt:-1});

 res.json(urls);

 }catch(error){

 res.status(500).json({error:"Server error"});

 }

});

module.exports=router;