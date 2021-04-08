const express = require('express');
const router = express.Router();
const https = require("https");

var synonyms = [];

router.get('/synonym', function (req, res) {
  // returns all of the API data
  const max = Math.floor(req.query.max);

  let regex = /^\W*|\W*$/g;
  let ml = (req.query.ml).replace(regex, '');
   // TODO escape ? or remove everythign but - -- or '

  (async () => {
    synonyms = await getSynonyms(max, ml);
    return res.send(synonyms);;
  })();

});


router.get('/simple-synonym', function (req, res) {
  // returns only an array of synonyms
  const max = Math.floor(req.query.max);
  let ml = req.query.ml;

  var synonyms = {};
  let synonymArray = [];

  (async () => {
    synonyms = await getSynonyms(max, ml);

    if (synonyms.length != 0 && synonyms[0]['word'] != null) {
      synonymArray = synonyms.map(item => item.word);        
    }

    return res.send(synonymArray);
  })();

});


//http://api.datamuse.com/words?max=10&ml=pot

function getSynonyms (max = 10, ml) {
  let body = [];
  let result = [];
  let url = "https://api.datamuse.com/words?";

  url += "max=" + max;
  url += "&ml=" + ml;

  return new Promise((resolve, reject) => {

    try {
      https.get(url, (res) => {
        res.setEncoding("utf8");
        res.on("data", (data) => {
          body += data;
        });
        res.on("end", () => {

          try {
            result = JSON.parse(body);

            resolve(result);

          } catch (error) {
            reject(new Error(error.message));
          };
        });
      });
    } catch (error) {
      console.log(error);

      reject(new Error(error.name + error.message));
    };
  });

};

module.exports = router;
