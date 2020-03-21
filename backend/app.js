let express = require('express'),
  //express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');
  expressValidator = require('express-validator');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
// const playerRoute = require('../backend/routes/player.route')
// const gameRoute = require('../backend/routes/game.route')
// const router = require('../backend/routes/auth.routes')

const playerRoute = require('./routes/player.route')
const gameRoute = require('./routes/game.route')
const router = require('./routes/auth.routes')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.static(path.join(__dirname, '/dist/GamerLobby')));
app.use('/', express.static(path.join(__dirname, '/dist/GamerLobby')));
app.use('/api', router)
app.use('/api/players', playerRoute)
app.use('/api/games', gameRoute)

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});