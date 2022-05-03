'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('express-async-errors');
const connectDB = require('./db/connect.js');
const errorHandlerMiddleware = require('./middlewares/error-handler.js');

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});


//Error handler Middleware
app.use(errorHandlerMiddleware);

// Start the program by connecting to the database
// and then starting the server
(async function() {
  try {
    await connectDB(process.env.DB);
    listener();
  } catch(error) {
    console.log(error);
  }
})();

//Start our server and tests!
const listener = function(){
  return app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + this.address().port);
    if(process.env.NODE_ENV==='test') {
      console.log('Running Tests...');
      setTimeout(function () {
        try {
          runner.run();
        } catch(e) {
            console.log('Tests are not valid:');
            console.error(e);
        }
      }, 1500);
    }
  });
}

module.exports = app; //for unit/functional testing
