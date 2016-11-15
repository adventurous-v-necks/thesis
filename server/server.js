
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const isDeveloping = process.env.NODE_ENV !== 'production';

const mongoAddress = isDeveloping ? 'mongodb://localhost/dj-controller' : 'mongodb://devMongo:27017/dj-controller';

mongoose.Promise = Promise;
mongoose.connect(mongoAddress);

let db = mongoose.connection;

db.on('error',console.error);

var gracefulExit = function() {
  db.close(function () {
    console.log('Database connection safely closed.');
    process.exit(0);
  });
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);


const port = isDeveloping ? 3000 : process.env.PORT;

const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('connection')
 console.log('a user connected', socket.conn.remoteAddress);
 io.emit('new_peer', socket.conn.remoteAddress);
});

app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('cookie-parser')());
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
app.use(expressSession({ secret: 'mysecret', resave:true, saveUninitialized:true, store: new MongoStore({mongooseConnection:db, collection:'session'})}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(mongoose.mongo.ObjectId(id), function(err, user) {
    done(null, user);
  });
});
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!user.validPassword(password)) { return done(null, false); }
    return done(null, user);
  });
}));

app.get('/example_rest_endpoint/:id', function response(req, res) {
res.write(`hello ${req.params.id}`); // or you can use res.json({some object})
res.end();
});

app.get('/getLoggedInUsername', function response(req, res) {
  res.write(req.user ? req.user.username : 'Not Logged In');
  res.end();
});
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/tryLogin/failed' }),
  function(req, res) {
    res.redirect('/');
  });

const reactRoutes = [{path: '/abc', auth: true}, {path: '/tryLogin', auth: false}];

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));


  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '../dist'));
  app.get('*', function response(req, res) {
    let routeFound = false;
    for (var rt of reactRoutes) {
      if (rt.path === req.url.slice(0, rt.path.length)) {
        routeFound = true;
        if (rt.auth === false || req.isAuthenticated()) {
          res.sendFile(path.join(__dirname, '../dist/index.html'));
        } else {
          res.status(401).sendFile(path.join(__dirname, '../public', 'unauth.html'));
        }
        break;
      }
    }
    if (!routeFound) res.sendFile(path.join(__dirname, '../dist', req.url));
  });
}


app.use(function(err, req, res, next) {
  console.log(err);
  res.status(404).sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Listening on port %s.', port);
});

