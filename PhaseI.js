const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const port = 3000;

app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/rest/list/', function(req, res) {
  const searchKey = "{ id: '" + req.params.item + "'}";
});

app.get('/rest/ticket/:id', function(req, res) {
  const searchKey = "{ id: '" + req.params.item + "'}";
  console.log("Looking for: " + searchKey); 
});

app.get('/wfile', function(req, res) {
  const myquery = req.query;
  
  var outstring = '';
  for(var key in myquery) { outstring += "--" + key + ">" + myquery[key]; }
  fs.appendFile("mydata.txt", outstring+'\n', (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("Contents of file now:\n");
      console.log(fs.readFileSync("mydata.txt", "utf8"));
    }
  });
 
  res.send(outstring);

});

app.post('/rest/ticket/', function(req, res) {
  const id = req.body.id;
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
  
  res.send({
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
  });
});
