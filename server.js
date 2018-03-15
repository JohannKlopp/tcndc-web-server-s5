const express = require('express');
const hbs = require("hbs");
const fs = require("fs"); // requiring the filesystem. Allows me to access the PC's filesystem and manipulate it
const port = process.env.PORT || 3000; // default is 3000

var app = express();

hbs.registerPartials(__dirname + "/views/partials"); // add support for partials
app.set("view engine", "hbs"); // "handlebars" is a view engine for express, just like "pug"




//  *********************************************************
//  "Helpers" or "Variables" that I can put into my html code
//  to get/perform what I wrote into the function here
//  *********************************************************

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toLowerCase();
});

hbs.registerHelper("linkToGH", (text) => {
  var myGhSite = "<a href=https://github.com/JohannKlopp>"+text+"</a>";
  return myGhSite;
});

hbs.registerHelper("linkToJK", (text) => {
  var mySite = "<a href=http://johannklopp.com/>"+text+"</a>";
  return mySite;
});




//  ***************************
//  Navigation on the website
//  ***************************

app.get("/", (req, res) => {
  res.render("home.hbs", { // html file "home.hbs" i.e. has property "welcomeMessage" to be used inside its html code like a variable
    welcomeMessage: "Welcome to this Wonderful World!",
    pageTitle: "Home Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", { // rendering a separate html file.
    pageTitle: "About Page",
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Johann's Projects",
    myGhMsg: "my GitHub",
  });
});

// /bad - send back JSON with errorMessage property "Error handling this request"
app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Uups unable to handle this request."
  });
});




//  ***************************
//  Setting up the server itself
//  ***************************

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
