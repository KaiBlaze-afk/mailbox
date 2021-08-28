const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs')
app.use(express.static('public'))
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
router.get('/main', function (req, res) {

  var data = req.query.message;
  next = data
  if (data == undefined) {
    console.log("Blank")
  }
  else {
    fs.copyFile('public/reply.txt', 'public/message.txt', () => {
      fs.writeFileSync('public/reply.txt', next);
    });
    
  }
  res.sendFile(path.join(__dirname + '/public/main.html'));

});
router.get('/contact', function (req, res) {
  var data = req.query.message;
  console.log(data);
  res.sendFile(path.join(__dirname + '/public/contact.html'));
});
router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');