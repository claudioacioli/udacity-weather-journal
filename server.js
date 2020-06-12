// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Setup empty JS object to act as endpoint for all routes
const projectData = {};
const OPEN_WEATHER_API_URL = 'api.openweathermap.org';
const OPEN_WEATHER_API_KEY = 'aa8234745b091ee3bb02c21e583fcc34';
// Instance of app
const app = express();
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Static content
app.use(express.static('public'));
// Setup Server
const PORT = 8080;
const listining = () => {
  console.log('Server On');
  console.log(`Listening on http://localhost:${PORT}`);
};
app.listen(PORT, listining);

