/**
 * Created by Leroys on 2016/12/06.
 */
//Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

//Get our API routes
const todos = require('./server/routes/apiTodo');
const app = express();

//Parsers fpr POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extend : false
}));

//Point static path
app.use((express.static(path.join(__dirname, 'dist'))));

//Set our api routes
app.use('/api/v1/', todos);

//Catch all other routes and return the index file
app.get('*', function (req,res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// app.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

//Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

//Create Http Server
const server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port,()=>console.log('API running in localhost:'+port));

