$(function () {

	let plag = " ┌─┐┬  ┌─┐┌─┐┌─┐┬─┐┬┌─┐┌─┐┬─┐ \n" +
		         " ├─┘│  ├─┤│ ┬├┤ ├┬┘│┌─┘├┤ ├┬┘ \n" +
             " ┴  ┴─┘┴ ┴└─┘└─┘┴└─┴└─┘└─┘┴└─ ";
  console.log("Welcome to the\n" + '%c' + plag, 'background: #142020; color: white');

  //TODO consider using this global variable
  let theQuote = {  randQuote:'',
                    randAuthor:'',
                    randQuoteArray: [],
                    myQuote: '',
                    myQuoteArray: [],
                  };

  // settings
  let longWordLength = 4; // words longer than this will look for synonyms
  let numberOfSynonyms = 10; // maximum number of synonyms



  // function updateMyQuote(event) {
  //   event.preventDefault();
  //   // console.log('updateMyQuote',event);

  //   // var t = $('#myQuote p').text();
  //   // console.log(t);

  // }

  function addListeners() {
    // $('#myQuote select').on('change', updateMyQuote);
    $('#myQuote').on('click', 'button', function (event) {
      let finishedQuote = getFinishedQuote(event);
      insertFinishedQuote(finishedQuote);
    });


    // Aoril 6, 2021 works a couple times, then breaks, gets multiple quotes
    // may need to reset variables cleaner
    
    // $('#restart').on('click', function(event) {
    //   event.preventDefault();
    //   $('#myQuote form p').empty();
    //   $('#finalQuote p').empty();
    //   $('#myQuote').show();
    //   $('#myQuote label, #myQuote input, #myQuote button').hide();
    //   bigFunction();
    // } );

  }


  const bigFunction = async () => {

    try {
      const randQuote = await getRandQuote();
      insertQuote(randQuote)
      const quote = await quoteToArray(randQuote);
      insertQuoteArray(quote);
      theQuote = quote;
    } catch (e) {
      throw new Error(e.message);
    } 
 
  };


  const getRandQuote = async () => {
    // fetch a random quote, returns a quote object Promise.
    let quote = {};
    return await new Promise((resolve, reject) => {

      try {
        $.ajax({
          type: "GET",
          url: '/quotes/quote',
        })
          .done(function (data) {
            try {
              if (data.error !== undefined) {
                reject(new Error(data.error));
              } else if (Object.keys(data).length > 1) {
                quote.quote = data.quote;
                quote.author = data.author;
                resolve(quote);
              }
            } catch (e) {
              reject(new Error(e.message));
            }
          });
      } catch (e) {
        reject(new Error(e.message));
      }
    });

  };


  const getSynonyms = async (wordToUse) => {
    // input string, output array of synonyms for that input

    const regexStart = /^\W*/;  // for punctuation at the start of a word
    const regexEnd = /\W*$/;  // for punctuation at the end of a word
    let punctuationStartResult = wordToUse.match(regexStart);
    let punctuationEndResult = wordToUse.match(regexEnd);
    let punctuationStart = '';
    let punctuationEnd = '';
    let result = [];

    if (punctuationStartResult != null) {
      punctuationStart = punctuationStartResult[0];
    }
    if (punctuationEndResult != null) {
      punctuationEnd = punctuationEndResult[0];
    }

    wordToUse = wordToUse.replace(regexStart, '').trim();
    wordToUse = wordToUse.replace(regexEnd, '').trim();

    return await new Promise((resolve, reject) => {

      try {
        $.ajax({
          type: "GET",
          url: '/synonyms/simple-synonym', // TODO update this link
          data: {
            "max": numberOfSynonyms,
            "ml": wordToUse,
          },
        })
          .done(function (data) {

            try {

              if (data.length != 0 && data[0] != null) {
                result = data.map(function (item) {

                  // maintain initial case and punctuation
                  if (wordToUse.charAt(0) === wordToUse.charAt(0).toUpperCase()) {
                    item = item.charAt(0).toUpperCase() + item.substr(1);
                  };
                  return punctuationStart.concat(item).concat(punctuationEnd);
                })
              }

              resolve(result);

            } catch (error) {
              reject(new Error(error.message));
            }

          });
      } catch (error) {
        reject(new Error(error.message));
      }

    });
  };
  

  function insertQuote (quote) {
    // basic insert the quote 
    $("#quote").empty();
    $("#quote").append('<p>' + quote.quote + '</p><p>' + quote.author + '</p>');
  }


  function insertQuoteArray(quote) {
    // take the arrayed quote and put it in the dom

    // TODO the names for quotebuildup seems weird
    let $quoteBuildUp = $("#myQuote > form > p");
    let textString = '';
    

    for (let i = 0; i <= quote.quoteArray.length - 1; i++) {

      if (quote.quoteArray[i][1].length > 0) {
        
        if (textString.length > 0) {
          $quoteBuildUp.append('<span name="myQuotePart' + (i - 1 + 1000) + '">' + textString + '</span>');

          textString = '';
        }

        let $select = $('<select>').attr('name', 'myQuotePart' + (i + 1000));
        $select.append('<option value="' + quote.quoteArray[i][0] + '">' + quote.quoteArray[i][0] + '</option>');

        quote.quoteArray[i][1].forEach(function (element, j) {
          $select.append('<option value="' + element + '">' + element + '</option>')
        })

        $quoteBuildUp.append($select).append(' ');

      } else {
        textString += quote.quoteArray[i][0] + ' ';
      }

    } // end for loop

    if (textString.length > 0) {
      $quoteBuildUp.append('<span name="myQuotePart2000">' + textString + '</span>');
    }

    $quoteBuildUp.append($quoteBuildUp);
    $('#myQuote label, #myQuote input, #myQuote button').show();
    addListeners();

  }


  function getFinishedQuote(event) {
    // gets the current version of myQuote
    event.preventDefault();

    let selects = $("#myQuote form").serializeArray();
    selects.forEach(element => {
      element.value += ' ';
    });

    let texts = $('#myQuote span').toArray()
      .map(function (item) {
        return {
          name: item.getAttribute("name"),
          value: item.innerText,
        };
      })

    let finishedQuoteArray = selects.concat(texts);

    finishedQuoteArray.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          // field names are somehow equal
          return 0;
        }
    });

    var finishedQuoteName = '';

    let finishedQuoteText = finishedQuoteArray.reduce(function(accumulator, currentValue) {

      if (currentValue.name !== 'myName') { 
        return accumulator + currentValue.value
      } else { 
        finishedQuoteName = currentValue.value;
        return accumulator 
      }
    },'')

    return { finishedQuoteText: finishedQuoteText,
             finishedQuoteName: finishedQuoteName};
  }


  function insertFinishedQuote(finishedQuote) {
    $("#finalQuote").empty();
    $("#finalQuote").append('<p>' + finishedQuote.finishedQuoteText + '</p><p>' + finishedQuote.finishedQuoteName + '</p>');

    $("#myQuote").hide();
  }



  function cleanQuote(quote) {
    let regex1 = /<[^>]*>/gm; //takes out html
    // let regex2 = /\s\W+/gm; // cleans spaces before punctuation

    return quote.replace(regex1, ' ').replace('&#8217;', "'").trim();
  }


  const quoteToArray = async (quoteObj) => {
    let splitQuote = [];
    quoteObj.quote =  cleanQuote(quoteObj.quote);
    quoteObj.quoteArray = [];

    let regex = /^\W*|\W*$/g;
    let itemLength = 0;

    splitQuote = quoteObj.quote.split(' ');

    for (let i = 0; i <= splitQuote.length-1; i++) {
      quoteObj.quoteArray[i] = [splitQuote[i]];

      itemLength = splitQuote[i].replace(regex, '').length;

      if (itemLength > longWordLength) {
        quoteObj.quoteArray[i][1] = await getSynonyms(splitQuote[i]);
      } else {
        quoteObj.quoteArray[i][1] = [];
      };
    }
    return quoteObj;
  }

  bigFunction(); // gets the first random quote


}); 