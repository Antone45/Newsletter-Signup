const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+ "/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    console.log(firstName,lastName,email);


const data={
    members: [
        {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
};

const jsonData=JSON.stringify(data);

const url="https://us10.api.mailchimp.com/3.0/lists/d60061ed71";
const options={
    method: "POST",
    auth:"Antone1:1632e946a145855ad8fc62ef7f5d66a7-us10"
};

const request=https.request(url,options,function(response){
    

    if(response.statusCode===200){
        res.sendFile(__dirname+ "/success.html");
    }else{
        res.sendFile(__dirname+ "/failure.html");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    });
     
});
request.write(jsonData);
request.end();

});


app.post("/failure.html", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started on port 3000");
}); 

//KEY
//1632e946a145855ad8fc62ef7f5d66a7-us10

//List id
//d60061ed71