/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/ 3
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

var fetch = require('node-fetch');
var axios = require('axios');


const key = process.env.API_KEY;

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/item", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.get("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post("/search", async (req, res) => {

  // query data
  const schstr = req.body.search;
  const eng = req.body.engine;

  const request_cb = async () => {
    if (eng === "Both") {
      try {
        const respon1 = await axios.get(`https://serpapi.com/search.json?engine=google&q=${schstr}&api_key=${key}`);
        const respon2 = await axios.get(`https://serpapi.com/search.json?engine=bing&q=${schstr}&api_key=${key}`);
        return ({
          google: respon1.data.organic_results,
          bing: respon2.data.organic_results
        });
      } catch (e) {
        return e;
      }
    }

    try {
      const respon = await axios.get(`https://serpapi.com/search.json?engine=${eng}&q=${schstr}&api_key=${key}`);
      console.log(respon.data);
      return (respon.data.organic_results);
    } catch (e) {
      console.log(`hubo un error: ${e}`);
      return e;
    }
  };

  const result = await request_cb();
  console.log(`este es el resultado: ${result}`);


  res.json({
    success: "successful search",
    search_result: result,
  });
});

app.post("/item", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/item", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/item", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
