# PLAGERIZER

This is a [plagiarizing](https://www.dictionary.com/browse/plagiarize) site.

We take great famous quotes, swap some words and make them yours!


## APIs

* [Quotes.net](https://www.quotes.net/quotes_api.php)
* [DataMuse](https://www.datamuse.com/api/)


## Log
* 1-April-2019 creation
* 25-April-2019 getting synonyms for long words.  Click on title and observe in console.
* 25-March-2021 getting back to significant work. Fixed asynchronous problems. 
* 29-March-2021 jQuery dropdowns working and collecting data.

## How To Run Locally

1. git clone this repo to your computer
2. $ npm install
3. $ npm start
4. navigate to [http://localhost:5002](http://localhost:5002)


### One Possible Big Plan
take a quote + author, break it up and make the long words dropdowns with synonyms.  picking the dropdowns then sumbit saves to a "link" /6 random letter combo id that saves to db as id, full quote and author and new quote and author and email.  make searchable by id value or email address

### OTHER APIs
https://www.quotes.net/quotes_api.php
https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand

https://www.datamuse.com/api/
https://api.datamuse.com/words?ml=ringing&max=10
https://www.wordsapi.com/#try
https://www.programmableweb.com/api/synonyms
https://words.bighugelabs.com/api.php

### OTHER
https://codepen.io/gabrieleromanato/pen/XRRpOO
https://jsfiddle.net/SteveSchrab/Th8Cs/
https://patorjk.com/software/taag/#p=display&h=1&f=Calvin%20S&t=plagerizer
