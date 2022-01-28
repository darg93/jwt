const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get("/status",(req,res)=>{
    res.json({
        status:"server listening"
    });
});


app.post("/login",(req, res)=>{

    const user = {        
        id: req.body.id,
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email 
    };

    jwt.sign({user},'secretKey',{expiresIn:'30s'},(err,token)=>{
        res.json({
            token
        });
    });

});


app.get("/verify",(req,res)=>{
    const headers = req.headers['authorization'];

    if(typeof headers !== 'undefined'){
        req.token = headers.split(" ")[1];
        jwt.verify(req.token,'secretKey',(error,authData)=>{
            if(error){
                res.sendStatus(403);
            }else{
                res.json({
                    response: "SUCCESS",
                    authData
                })
            }
        });

    }else{
        res.sendStatus(403);
    }
});




app.listen(3001,()=>{
    console.log("¡SERVER UP!");
});
