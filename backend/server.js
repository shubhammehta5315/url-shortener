const Url=require("./models/Url");

app.get("/:shortId",async(req,res)=>{

 const url=await Url.findOne({shortId:req.params.shortId});

 if(!url) return res.send("URL not found");

 url.clicks++;

 await url.save();

 res.redirect(url.originalUrl);

});