const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');
// const flash = require('connect-flash');
//const cookieSession = require('cookie-session')
const session = require('express-session');
const keys = require('./config/keys');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
//const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => console.log('MongoDB Connected')).catch((err) => {
    console.log("Mongo url")
    console.log(process.env.MONGODB_URL)
    console.log(err)
  });

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

// EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');
// app.use(cookieSession({
//   maxAge: 24*60*60*1000,
//   keys: [keys.session.cookieKey]
// }))

// Express body parser
app.use(express.urlencoded({ extended: true }));

//app.set('trust proxy', 1)
// Express session
/* app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
); */

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
// app.use(flash());

// Global variables
/* app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
}); */


// Routes
// app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/users.js'));


const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server started on port ${PORT}`));