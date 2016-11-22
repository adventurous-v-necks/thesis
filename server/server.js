
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
const Grid = require('gridfs-stream');
const fs = require('fs');
const isDeveloping = process.env.NODE_ENV !== 'production';

const mongoAddress = isDeveloping ? 'mongodb://localhost/dj-controller' : 'mongodb://devMongo:27017/dj-controller';

mongoose.Promise = Promise;
mongoose.connect(mongoAddress);
Grid.mongo = mongoose.mongo;

let conn;
if (isDeveloping) {
  conn = mongoose.createConnection('localhost','dj-controller', 27017);
} else {
  conn = mongoose.createConnection('devMongo', 'dj-controller', 27017);
}
let gfs = new Grid(conn.db);
var db = mongoose.connection;

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

var counter = 0;
io.on('connection', function (socket) {
  // socket.on('room', function (room) {
  //   socket.join(room);
  // });

  socket.on('room', function(room){
    if(socket.room) {
      socket.leave(socket.room);
    }

    socket.room = room;
    socket.join(room);
  });
  
  io.sockets.in(room).emit('event2server', {data : data});
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

app.use(express.static('public'));

let fileUpload = require('express-fileupload');
app.use(fileUpload());

app.get('/getLoggedInUsername', function response(req, res) {
  res.write(req.user ? req.user.username : 'Not Logged In');
  res.end();
});

app.post('/login',
  passport.authenticate('local', { failWithError: true }),
  function(req, res, next) {
    return res.json({status: 'ok', username: req.user.username, user:req.user});
  },
  function(err, req, res, next) {
    console.log(err);
    return res.json({status: 'bad', message: 'Login failed, incorrect username or password'});
  }
);

app.post('/signup', function (req, res) {
  var newuser = new User({username:req.body.username, email: req.body.email});
  newuser.password = newuser.generateHash(req.body.password);
  newuser.save(function(err,data) {
    res.json({status: 'ok', message: 'Successfully created user', username: req.body.username});
  });
});

app.post('/upload', function (req, res) {
  let to = gfs.createWriteStream({filename: req.user.username+'___'+req.files.file.name});
  to.on('error',(e)=>console.log(e));
  to.on('close', () => {
    res.json({status: 'ok', message: 'uploaded file',
    filename: 'http://localhost:3000/get/'+req.user.username+'___'+req.files.file.name
    });
  });
  req.files.file.mv('/tmp/'+req.files.file.name, (e,f) => {
    fs.createReadStream('/tmp/'+req.files.file.name).on('end', () => {
      to.end();
    }).on('error', (e) => {
      res.json({status: 'bad', message: 'upload failed'});
    }).pipe(to);
  });
});

app.get('/get/:id', function (req, res) {
  gfs.createReadStream({filename: req.params.id}).pipe(res);
});

app.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');

app.get('/room/:id', function response(req, res) {
  console.log('get request to /rooms: ', req.params.id);
  // res.write({status: 'ok'});
  // io.on('change room', function(data) {
  //   socket.join(req.params.id);
  //   console.log('inside server.js change room =====================');
  // });
  // io.to(req.params.id).emit('event', {data : data});
  // res.end();
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

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('event2server', function (data) {
    socket.broadcast.emit('event', {data : data} )
  });
});
server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Listening on port %s.', port);
});
