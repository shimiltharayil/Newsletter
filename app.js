const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/login-form-20/index.html");   
});

app.listen(process.env.PORT,function (){
    console.log("Server started");
});

app.post("/",function(req,res){
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let data ={
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName  
                }
            }
        ]
    };
   let jsonData = JSON.stringify(data);
   const url = "https://us18.api.mailchimp.com/3.0/lists/dcea78ef03";
   const options={
    method:"POST",
    auth :"shim:0889b18f11961a827efbbaecc203b082-us18"
   }
   
   const request = https.request(url,options,function(response){
       response.on("data",function(data){
          console.log(JSON.parse(data));
       });
    
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/login-form-20/main.html");
    }else{
        res.sendFile(__dirname+"/login-form-20/failure-page.html");
    }
    });
    request.write(jsonData);
    request.end();
});






