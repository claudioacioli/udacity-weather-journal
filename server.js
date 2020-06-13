// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Setup empty JS object to act as endpoint for all routes
const projectData = [];
const readData = (req, res) => {
  res.send(projectData);
  res.end();
};
const createData = (req, res) => {
  console.log(req.body);
  projectData.push(req.body);
  res.status(201).send({"status": 201, "message": "item created."});
  res.end();
};
const error404 = (req, res) => {
  res.status(404).send({"status": 404, "message": "Page not found"});
}
// Instance of app
const app = express();
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Static content
app.use(express.static('public'));
// Routes
app.get("/data", readData);
app.post("/data", createData);
app.all("*", error404);
// Setup Server
const PORT = 8080;
const listining = () => {
  console.log('Server On');
  console.log(`Listening on http://localhost:${PORT}`);
};
app.listen(PORT, listining);

