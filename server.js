const express = require('express');
const hbs = require("hbs");
const fs = require("fs"); // requiring the filesystem. Allows me to access the PC's filesystem and manipulate it
const port = process.env.PORT || 3000; // default is 3000

var app = express();

hbs.registerPartials(__dirname + "/views/partials"); // add support for partials
app.set("view engine", "hbs"); // "handlebars" is a view engine for express, just like "pug"


// app.use( (req, res, next) => { //since we're doing sth async here, next() has to be called for the middleware to continue.
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`;
//   console.log(log);
//   fs.appendFile("server.log", log + "\n", (err) => {
//     if (err) {
//       console.log("Unable to append to server.log.");
//     }
//   });
//   next();
// });

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    welcomeMessage: "Welcome to this wonderful world!",
    pageTitle: "Home Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", { // rendering a separate html file.
    pageTitle: "About Page",
  });
});

// /bad - send back JSON with errorMessage property "Error handling this request"
app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Uups unable to handle this request."
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
