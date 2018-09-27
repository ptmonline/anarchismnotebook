var request = require('request');
var cheerio = require('cheerio');
var colors = require('colors');


function searchItems() {
  console.log("searching... https://www.goodreads.com/quotes/tag/anarchism")
  request({
    uri: "https://www.goodreads.com/quotes/tag/anarchism",
  }, function (error, response, body) {
    var $ = cheerio.load(body);
    var quote = $('.quote.mediumText');

    $(quote).each(function () {
      var punctuation = $(this).find('.quoteText');
      var author = $(punctuation).find('.authorOrTitle');
      // console.log(colors.green($(author).text()));
    })
  });
}
searchItems();
