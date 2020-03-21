const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'dist/GamerLobby')));

///app.use(express.static(__dirname + '/dist/testApp'));
//app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/GamerLobby/index.html'));
});



const port = process.env.PORT || 4200;
app.listen(port, function(){
    console.log('Listening on port ' + port);
});
  