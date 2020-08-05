// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

const server= app.listen(port, listening);

function listening(){
    console.log('server is running');
    console.log(`running on localhost: ${port}`);
}

//GET Request
app.get('/all',function(req,res){
    res.send(projectData);
    console.log('Data received');
});


//POST Request
app.post('/add',addData);

function addData(req,res){

   const newData={
        date:req.body.date,
        temp: req.body.temp,
        content:req.body.content,
    };
    projectData.date = newData.date;
    projectData.temp = newData.temp;
    projectData.content = newData.content;
    
    console.log(projectData);
    
}