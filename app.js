const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('petshopstore');
const morgan = require('morgan');
const path = require('path');
const bodyparser= require('body-parser');
const mysql= require('mysql');

const app = express();
app.set('view engine', 'ejs'); //registering ejs (view engine)


//establishing(creating) db connection
mysql.createConnection(
  {
  host:"localhost",
  user:"root",
  password:"",
  database:"purrfectstore"
}
)

//****importing routes***

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





app.use(morgan('tiny')); // middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(bodyparser.urlencoded({extended:true}));   

app.get('/', (req, res) => {
  res.render('homepage');

})

app.listen(3000, () => {
  debug(`listening on port ${chalk.blue.bold('3000')}`);
});

