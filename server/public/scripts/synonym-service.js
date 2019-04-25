	
  //pick a random number for the quote
  const totalQ = 11000; // total number of possible quotes
  let randQid = Math.ceil(Math.random() * totalQ);
  console.log(randQid, 'synonyms');

  // $.ajax({
  //         type: "GET",
  //         url: "https://www.forbes.com/forbesapi/thought/uri.json",
  //         data: { enrich: false, query: randQid },
  //         // dataType: "text/plain",
  //         // crossDomain: true,
  //         // xhrFields: {
  //         //   withCredentials: false
  //         // },
  //         success: function (res) {
  //           console.log(res);
  //           // people = data;
  //           // createTracker();
  //           // showPerson();
  //           // startTimer();
  //         } //closes success
  //       }); // closes ajax
