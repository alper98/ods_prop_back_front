const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let fixtures = [];

var todayDate = new Date();
var today =
  todayDate.getFullYear() +
  "-" +
  String(todayDate.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(todayDate.getDate()).padStart(2, "0");

var nextWeek =
  todayDate.getFullYear() +
  "-" +
  String(todayDate.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(todayDate.getDate() + 2).padStart(2, "0");

app.get("/api/fixtures/all", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  try {
    await axios
      .get(
        "https://soccer.sportmonks.com/api/v2.0/fixtures/between/" +
          today +
          "/" +
          nextWeek +
          process.env.APITOKEN +
          "&include=localTeam,visitorTeam,probability"
      )
      .then((response) => {
        fixtures = response.data;
        res.json(response.data);
      })
      .catch((err) => res.send(err));
  } catch (err) {
    console.error("GG", err);
  }
});

// ------------------------------------------------
// Dont think about this stuff
// ------------------------------------------------
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
