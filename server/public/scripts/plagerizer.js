$(function () {

	let plag = " ┌─┐┬  ┌─┐┌─┐┌─┐┬─┐┬┌─┐┌─┐┬─┐ \n" +
		         " ├─┘│  ├─┤│ ┬├┤ ├┬┘│┌─┘├┤ ├┬┘ \n" +
             " ┴  ┴─┘┴ ┴└─┘└─┘┴└─┴└─┘└─┘┴└─ ";
             console.log("Welcome to the\n" + '%c' + plag, 'background: #142020; color: white');

  var theQuote = {};

  let getRandQuote = function () {

    let randQuoteNum = Math.ceil(Math.random()*10); // improves randomness 
    let whichQuoteNum = Math.ceil(Math.random()*randQuoteNum)-1;

     // $.ajax({
     //        type: "GET",
     //        url: "http://quotesondesign.com/wp-json/posts",
     //        data: { "filter[orderby]": "rand",
     //                "filter[posts_per_page]": randQuoteNum,
     //        },
     //      })
     //    .done(function (data) {
     //      // console.log( "Sample of data:", data );
     //          let quote = {
     //            quote: data[whichQuoteNum].content,
     //            author: data[whichQuoteNum].title
     //          }

     //          insertQuote(quote);

     //          theQuote = quote;
     //          // console.log(theQuote,'thequote');
     //    });


  fetch('//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=' + randQuoteNum)
    .then(response => response.json())
    .then(function(data) {
      // console.log(JSON.stringify(myJson[whichQuoteNum]));
      // console.log(myJson[whichQuoteNum]);
      console.log(data[whichQuoteNum]);

      let quote = {
        quote: data[whichQuoteNum].content,
        author: data[whichQuoteNum].title
      }

      insertQuote(quote);

      theQuote = quote;

    });




  }
  
  getRandQuote(); // gets the first random quote

  function insertQuote (quote) {
    // console.log(quote);
    $("#quote").append(quote.quote + "\n" + quote.author);
    // console.log('here');

  }

  function getSynonyms (word) {

     $.ajax({
            type: "GET",
            url: "http://quotesondesign.com/wp-json/posts",
            data: { "filter[orderby]": "rand",
                    "filter[posts_per_page]": randQuoteNum,
            },
          })
        .done(function (data) {
          // console.log( "Sample of data:", data );
              let quote = {
                quote: data[whichQuoteNum].content,
                author: data[whichQuoteNum].title
              }

              insertQuote(quote);

              theQuote = quote;
              // console.log(theQuote,'thequote');
        });



  }

  function insertQuoteArray (quoteArray) {

    let $quoteBuildUp = $('<form></form>');

    for (var i = 0; i <= quoteArray.length; i++) {

      if (quoteArray[i][1]) {
        quoteBuildUp.append('<select></select>');




// <select>
//   <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="mercedes">Mercedes</option>
//   <option value="audi">Audi</option>
// </select>

      } else {
        quoteBuildUp.append('<span ')


      }
    }


    quoteBuildUp.append()

    $newTaskRow.append('<textarea class="task col-xs-6" type="text" name="title" value="' + task.task + '">' + task.task + '</textarea>' );

    var taskDueDate = new Date(task.task_due).toISOString().slice(0,10);

    $newTaskRow.append('<input class="dueDate col-xs-2" type="date" name="task_due" value="' + taskDueDate + '"/>');



    $("#quote").append(quoteBuildUp);
  }



// String target = someString.replaceAll("<[^>]*>", "");

// var regex = "<[^>]*>";

// console.log(theQu.replace(regex, ''));
  // let setQuote = function (quote) {
  //   theQuote = quote;

  // };

 $('#top').click(function () {
  console.log(theQuote);
  var regex = /<[^>]*>/gm;
  console.log(  'x'+(theQuote.quote.replace(regex, ' ')).replace(/\s+/gm,' ').trim()+'x');
  quoteToArray(theQuote);
 })


function quoteToArray (quoteObj) {
  let quoteArray = [];

  let regex1 = /<[^>]*>/gm;
  let regex2 = /\s+/gm;
  quoteObj.quote =  (quoteObj.quote.replace(regex1, ' ')).replace(regex2,' ').trim();

  quoteArray = quoteObj.quote.split(' ');


  // check whether it's a long word...
  for (var i = quoteArray.length - 1; i >= 0; i--) {
    if (quoteArray[i].length > 5) {
      quoteArray[i] = [quoteArray[i],true];
    } else {
      quoteArray[i] = [quoteArray[i],false];
    };
  }


  console.log(quoteArray);

}







$.getScript('scripts/synonym-service.js', function() {
    console.log('Load was performed.');
});

  	// $('#quote').('article')


  // $('.color-button').on('click', function () {

  //  nextColor = $(this).data('color'); // retrieves the color data

  //  $newBlock = $('<div class="color-cube ' + nextColor + '"></div>'); // creates a div string with the color-cube and "nextColor" classes.

  //  $('.container').append($newBlock); // appends the div

  //  colorTotal[nextColor]++;  // increases the total count of the color

  //  $('body').find('#' + nextColor).text(colorTotal[nextColor]);
  //  // updates the total color count in the top table.

  // });

}); 