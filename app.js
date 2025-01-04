// init modules
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const connectionDB = require('./connections/connectionDB')
const Passport = require('./middlware/passport')
// init contollers
const initialilazationAll = require('./controllers/initializationDB')

// init routes
const authRoutes = require("./routes/auth");
const recognitionRoutes = require("./routes/recognition");

const app = express();

//connection to DB
connectionDB.sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

//init all DB tables
initialilazationAll.initialilazationAll()

// init and usining passport module
app.use(passport.initialize())
Passport(passport) 

// using dev modules
app.use(morgan("dev"));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// write path of route and meneger route file
app.use('/api/auth', authRoutes)
app.use('/api/recognition', recognitionRoutes)



module.exports = app