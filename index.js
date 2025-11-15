const flash = require('express-flash')
const express = require('express')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const bodyParser = require('body-parser')
require('dotenv').config()
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT
const routeAdmin = require('./route/admin/index.route.js')
const routeClient = require('./route/client/index.route.js')
const database = require('./config/database.js')
app.use(bodyParser.urlencoded({ extended: true }))

// body-parser
// end body-parser
// pug
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
// end pug
// static file in express
app.use(express.static(`${__dirname}/public`))
// end static file in
// body-parser
app.use(methodOverride('_method'))

// end body-parser
//flash
app.use(cookieParser('ABCSDSADAS'));
app.use(expressSession({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash
routeAdmin(app);
routeClient(app);
database.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})