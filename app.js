const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('petshopstore');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const app = express(); //object instantiated
app.set('view engine', 'ejs'); //registering ejs (view engine)

//establishing(creating) db connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
})
db.connect((error) => {

  if (error) {
    console.log(error);
  } else {
    debug('database connected succesfully')
  }
})


app.use(morgan('tiny')); // middleware
app.use(express.static(path.join(__dirname, './public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser()); //cookies haru use garna






// required for passport
app.use(session({
  name:'mycookie',
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session




//homepage ko chuttai route banauna baki cha

app.get('/', (req, res) => {
  res.render('homepage');

})

require('./controllers/passport')(passport); // pass passport for configuration
//****importing routes***
require('./routes/adminroutes.js')(app, passport);

const catrouter = require('./routes/catroutes');
app.use('/catproducts', catrouter);

const dogrouter= require('./routes/dogroutes');
app.use('/dogproducts',dogrouter);

const fishrouter= require('./routes/fishroutes');
app.use('/fishproducts',fishrouter);

const loginrouter= require('./routes/loginroutes');
app.use('/login',loginrouter);

const signuprouter= require('./routes/signuproutes');
app.use('/signup',signuprouter);




app.listen(3000, () => {
  debug(`listening on port ${chalk.blue.bold('3000')}`);
});
