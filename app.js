const express = require("express");
const ExpressError = require("./expressError");
const itemRoutes = require("./routes/itemRoutes");
const items = require("./fakeDb");

const app = express();
app.use(express.json());

app.use("/items", itemRoutes);

app.use(function(req, res, next) {
  return new ExpressError("Not found", 404);
});

module.exports = app;