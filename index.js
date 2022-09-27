var express = require("express"); 
var bodyParser = require("body-parser")
var mongoose = require("mangoose");
const { Collection } = require("mongoose");

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://Localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/subscribe",(req,res)=>{
    var name = req.body.name;
    var email =req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno" : phno,
        "password" : password
    }

    db.connection('users').instertOne(data,(err,Collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted successfully");
    });

    return res.redirect('subscribe_success.html')

})

app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })

    return res.redirect('index.html');
}).listen(7000);

console.log("Listening on Port 7000");








    

