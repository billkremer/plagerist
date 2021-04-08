const express = require('express');
const router = express.Router();
const https = require("https");

var quote = {};

router.get('/quote', function (req, res) {

  (async () => {
    try {
      quote = await getQuote();
      return res.send(quote);

    } catch (e) {
      return res.send({error: e.message,
      errorType: e.name});
    }
  })();

});


function getQuote() {
  let body = '';
  let url = "https://www.abbreviations.com/services/v2/quotes.php?";

  url += "uid=" + process.env.QUOTES_API_UID;
  url += "&tokenid=" + process.env.QUOTES_API_TOKEN;
  url += "&searchtype=RANDOM";
  url += "&format=json";

  return new Promise((resolve, reject) => {

    try {
      https.get(url, (res) => {
        res.setEncoding("utf8");
        res.on("data", (data) => {
          body += data;
        });
        res.on("end", () => {

          try {
            body = JSON.parse(body);

          } catch (e) {
            if (e instanceof SyntaxError) {
              reject(new Error('QUOTE API JSON Error.'))
            } else {
              reject(new Error(e));
            }
          } finally {
            if (typeof body.result == "undefined") {
              reject(new Error('quote not found'));
            } else {
              resolve(body.result);
            }
          }
        });
      });
    } catch (e) {
      reject(new Error(e.name + e.message));
    };

  });

};


module.exports = router;

