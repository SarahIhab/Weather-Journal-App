// Setup empty JS object to act as endpoint for all routes
projectData = {};
const data = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

//GET route (gets data)
app.get("/all", function (request, response) {
  response.send(projectData);
});

//POST request (sends data securely)
app.post("/add", function (request, response) {
  let newData = request.body;
  let newEntry = {
    temp: newData.temp,
    date: newData.date,
    userResponse: newData.userResponse,
  };
  data.push(newEntry);
  projectData = {
    data,
  };
});
