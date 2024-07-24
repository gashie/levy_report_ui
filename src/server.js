const express = require('express');
const dotenv = require('dotenv');
const { engine, create } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
var AccessControl = require('express-ip-access-control');
const session = require('express-session');

// initialisation
const app = express();

//call helmet

//block ip

// var options = {
// 	mode: 'allow',
// 	denys: [],
// 	// allows: ['192.168.0.249','192.168.0.250','192.168.0.251'],
// 	forceConnectionAddress: false,
// 	log: function(clientIp, access) {
// 		// console.log(clientIp + (access ? ' accessed.' : ' denied.'));
// 	},

// 	statusCode: 401,
// 	redirectTo: '/login',
// 	message: 'Unauthorized'
// };
// app.use(AccessControl(options));


//load env vars
dotenv.config({ path: './config/config.env' });

// Settings
app.set('port', process.env.PORT || 5123);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);

app.set('view engine', '.hbs');

//helper
const hbs = create({
  /* config */
});
hbs.handlebars.registerHelper('fomartprice', function (price) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',
  }).format(price);
  return formatter;
});



hbs.handlebars.registerHelper("formatnumber", function(str) {
  var numberFormater = str.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return numberFormater
});

hbs.handlebars.registerHelper('if_eq', function(a, b, opts) {
  if(a == b) // Or === depending on your needs
      return opts.fn(this);
  else
      return opts.inverse(this);
});

/* Handler to check multiple conditions
   */
hbs.handlebars.registerHelper('checkIf', function (v1,o1,v2,mainOperator,v3,o2,v4,options) {
  var operators = {
       '==': function(a, b){ return a==b},
       '===': function(a, b){ return a===b},
       '!=': function(a, b){ return a!=b},
       '!==': function(a, b){ return a!==b},
       '<': function(a, b){ return a<b},
       '<=': function(a, b){ return a<=b},
       '>': function(a, b){ return a>b},
       '>=': function(a, b){ return a>=b},
       '&&': function(a, b){ return a&&b},
       '||': function(a, b){ return a||b},
    }
  var a1 = operators[o1](v1,v2);
  var a2 = operators[o2](v3,v4);
  var isTrue = operators[mainOperator](a1, a2);
  return isTrue ? options.fn(this) : options.inverse(this);
});
// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// set session here
var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      // secure: true,
      // Session expires after 1 min of inactivity.
      expires: 3600000
  }
  })
);

// set flash messages to show
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
// Routes
// app.use(helmet());
app.use(require('./routes/apps'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

//errror middleware
// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status = 404;
//   next(error);
// });

// app.get'*',(error, req, res, next) => {
//   res.status(error.status || 500);
//   res.render('/apps/errors/index.hbs')
// });
app.use((req, res) => {
  res.render('apps/errors/', { layout: 'notfound.hbs' });
});

//Or a catch-all route
app.get('*', (req, res) => {
  res.render('apps/errors/', { layout: 'notfound.hbs' });
});

module.exports = app;
