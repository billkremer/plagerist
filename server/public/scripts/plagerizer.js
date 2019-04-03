$(function () {

	let plag = " ┌─┐┬  ┌─┐┌─┐┌─┐┬─┐┬┌─┐┌─┐┬─┐ \n" +
		         " ├─┘│  ├─┤│ ┬├┤ ├┬┘│┌─┘├┤ ├┬┘ \n" +
             " ┴  ┴─┘┴ ┴└─┘└─┘┴└─┴└─┘└─┘┴└─ ";
             console.log("Welcome to the\n" + '%c' + plag, 'background: #142020; color: white');


  let getRandQuote = function () {

     $.ajax({
            type: "GET",
            url: "http://quotesondesign.com/wp-json/posts",
            data: { "filter[orderby]": "rand",
                    "filter[posts_per_page]": "5",
            },
          })
        .done(function (data) {
          console.log( "Sample of data:", data );
              let quote = {
                quote: data[0].content,
                author: data[0].title
              }
              console.log(quote,"kljhljh");
              insertQuote(quote);
        }); 

        // return rquote;
  }
  
  getRandQuote(); // gets the first

  let insertQuote = function (quote) {
    console.log(quote);
    $("#quote").append(quote.quote + "\n" + quote.author);
    console.log('here');

  }



// $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
//   $("body").append(a[0].content + "<p>— " + a[0].title + "</p>")
// });

// this.getRandomGif = function () {
//     giphyGetParams.params.tag = " ";
//     console.log('tag', giphyGetParams.params.tag);
//       return $http.get(apiUrl + 'random', giphyGetParams).then(function(response) {
//       //   ctrl.pokemonList = response.data.results;
//      console.log('got a random response!', response);
//     //  console.log(response.data.data.image_url);
//       return response.data.data;
//   //    ctrl.imageAlt = response.data.data.url;
//     }).catch(function(err) {
//       console.log('error getting random data from API :', err);
//     });
//   }; // close get random




// $.ajax({

//   "https://sumitgohil-random-quotes-v1.p.rapidapi.com/fetch/randomQuote")
// .header("X-RapidAPI-Key", "70c2080f54msh6cd254bf8b0c8e3p108f64jsne0e578285286")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });

// fetch('//www.forbes.com/forbesapi/thought/uri.json?enrich=false&query='+randQid)
//   .then(function(response) {
//     console.log(response);
//     return response;
//     // return response.json();
//   })
//   .then(function(myJson) {
//     // console.log(JSON.stringify(myJson));
//     console.log(myJson);
//   });


// $.getScript('scripts/service.js', function() {
//     console.log('Load was performed.');
// });

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