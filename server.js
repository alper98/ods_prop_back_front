const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const redis = require("redis");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let fixtures = [];

app.set("trust proxy", 1);

const rateLimit = require("express-rate-limit");
const { json } = require("body-parser");

const limiter = rateLimit({
  windowMs: 30 * 500,
  max: 10,
});

//  apply to all requests
app.use(limiter);

// -----------------------------------------
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
  String(todayDate.getMonth() + 6).padStart(2, "0") +
  "-" +
  String(todayDate.getDate()).padStart(2, "0");

let cacheData;
let cacheTime;

const redisPort = 6379;
const client = redis.createClient(redisPort);

//log error to the console if any occurs
client.on("error", (err) => {
  console.log(err);
});

// TODO: Add speedlimiter
app.get("/api/fixtures/all", limiter, async (req, res, next) => {
  try {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    client.get("fixtures", async (err, fixtures) => {
      if (err) throw err;

      if (fixtures) {
        res.status(200).send({
          data: JSON.parse(fixtures),
          message: "Fixtures from cache!",
          cacheTime: cacheTime,
        });
      } else {
        const { data } = await axios.get(
          "https://soccer.sportmonks.com/api/v2.0/fixtures/between/" +
            today +
            "/" +
            nextWeek +
            process.env.APITOKEN +
            "&include=localTeam,visitorTeam,probability"
        );
        console.log(data);
        client.set("fixtures", JSON.stringify(data));
        client.expire("fixtures", 300);

        cacheData = data;
        cacheTime = Date.now();

        data.cacheTime = cacheTime;
        res.status(200).send({
          data: data,
          message: "Not from cache",
        });
      }
    });
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
