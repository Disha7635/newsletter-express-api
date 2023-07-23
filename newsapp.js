const express=require('express');
const app=express();
const https=require("https");
app.use(express.urlencoded({extended:true}));
app.use(express.static("newspublic"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.post("/",(req,res)=>{
var firstname=req.body.firstname;
var lastname=req.body.lastname;
var email=req.body.email;
const data={
    members: [
{
    email_address:email,
    status:"subscribed",
    merge_fields: {
        FNAME:firstname,
        LNAME:lastname
    }
}
    ]
}
const jsondata= JSON.stringify(data);
const url="https://us10.api.mailchimp.com/3.0/lists/b506106489";
const options= {
    method: "post",
    auth: "Disha:2dceed03d40f60b5ea27a8a0f65fd600-us10"
}
const request=https.request(url,options,(response)=>{
const result=response.statusCode;
if(result===200)
res.sendFile(__dirname+"/newssuccess.html");
else
res.sendFile(__dirname+"/newsfailure.html");
response.on("data",(data)=>{
console.log(JSON.parse(data));
})
})
request.write(jsondata);
request.end();
})
app.post("/failure",(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT||5500,()=>{
    console.log("Server started at port 5500");
})