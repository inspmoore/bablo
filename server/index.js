const express = require("express");
const path = require("path");
const get3Rates = require("./nbuApi");

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/api/rates/:date", (req, res) => {
  const date = JSON.parse(req.params.date);
  get3Rates(date)
    .then(rates => res.json(rates))
    .catch(error => {
      console.log("INDEX ERROR");

      res.json(error);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);
