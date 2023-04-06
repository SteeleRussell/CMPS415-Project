const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const config = require("./config.json");
const port = 3000;
var fs = require("fs");

app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  const myquery = req.query;
  var outstring = 'Starting... ';
  res.send(outstring);
});

app.get('/rest/list/', function(req, res) {
  fs.readFile("mydata.txt" , "utf8", (err, jsonString) => {
    if (err){
      console.log("File read failed: ", err);
      return;
    }
    try{
      const ticket = JSON.parse(jsonString);
      console.log("Ticket: ", ticket);
    }
    catch (err){
      console.log("Error parsing JSON string: ", err);
    };
  })
});

app.get('/rest/ticket/:id', function(req, res) {
  const searchKey = "{ id: '" + req.params.item + "'}";
  console.log("Looking for: " + searchKey); 
});

app.post('/rest/ticket/', function(req, res) {
  const ticket = {
    id: req.body.id,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    type: req.body.type,
    subject: req.body.subject,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    recipient: req.body.recipient,
    submitter: req.body.submitter,
    assignee_id: req.body.assignee_id,
    follower_ids: req.body.follower_ids,
    tags: req.body.tags,
  }

  const jsonString = JSON.stringify(ticket);
  
  fs.writeFIle('mydata.txt', jsonString, err => {
    if(err) {
      console.log('Error writing file', err)
    }
    else{
      console.log('Succesfully wrote file')
    }
  })


  /*const id = req.body.id;
  const created_at = req.body.created_at;
  const updated_at = req.body.updated_at;
  const type = req.body.type;
  const subject = req.body.subject;
  const description = req.body.description;
  const priority = req.body.priority;
  const status = req.body.status;
  const recipient = req.body.recipient;
  const submitter = req.body.submitter;
  const assignee_id = req.body.assignee_id;
  const follower_ids = req.body.follower_ids;
  const tags = req.body.tags;
  


  /*res.send({
    'id': id,
    'created_at': created_at,
    'updated_at': updated_at,
    'type': type,
    'subject': subject,
    'description': description,
    'priority': priority,
    'status': status,
    'recipient': recipient,
    'submitter': submitter,
    'assignee_id': assignee_id,
    'follower_ids': follower_ids,
    'tags': tags
  }); */
});
