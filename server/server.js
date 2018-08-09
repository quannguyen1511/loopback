'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = (module.exports = loopback());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});

// app.use(function(req, res, next) {
//   if (!req.accessToken) return next();
//   var loopbackContext = require('loopback-context');
//   var user = userManager.users[req.accessToken.userId];
//   if (user) {
//     if (loopbackContext) loopbackContext.set('currentUser', user);
//     next();
//   } else {
//     app.models.User.findById(req.accessToken.userId, function(err, user) {
//       if (err) return next(err);
//       if (!user) return next('Invalid AccessToken!');
//       userManager.users[user.id] = user;
//       if (loopbackContext) loopbackContext.set('currentUser', user);
//       next();
//     });
//   }
// });
