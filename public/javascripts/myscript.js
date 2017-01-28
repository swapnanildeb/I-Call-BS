var WtN = require("words-to-num")
    global.numberChecker = function(str1){

  var str = str1.split(" ")
  //console.log(str)

  return !str.every(function(word){
    if(word == "")
      return true

      if("1234567890".search(word.charAt(0)) != -1 || !(isNaN(WtN.convert(word))) ){
        return false
      }
      else {
        return true
      }



  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//only works for how many questions
var pos = require('pos');
var fetch = require('node-fetch');

var cheerio = require('cheerio')
//var $ = cheerio.load('<h2 class="title">Hello world</h2>')


global.rephrase = function(sentence){


  var tagger = new pos.Tagger();
  var words = new pos.Lexer().lex(sentence);
  var tagger = new pos.Tagger();
  var taggedWords = tagger.tag(words);
  var tags = [];
  var hasNumber = false;
  var hasPercent = false;
  var numberIndex;
  var theNumber;
  for (i in taggedWords) {
      var taggedWord = taggedWords[i];
      var word = taggedWord[0];
      var tag = taggedWord[1];
      tags.push(tag);
      if(tag == "CD"){
        hasNumber = true;
        numberIndex = i;
        theNumber = word;
      }
      if(word == "%"){
        hasPercent = true;
       // taggedWords[i][0]="percent"
      }
      //console.log(word + " /" + tag);
  }
  if (hasNumber) {//as long as there are no extra prep clauses we can just ask how many go after the number then wrap around to the front
    //eg how many years old Donald Trump is
    var question = "how many";
    var i = Number(numberIndex)+1;
    var nounsStarted = false;


    while(i<taggedWords.length){
      question+=" "+taggedWords[i][0];
      i++;
    }
    i=0;
    while(i<numberIndex){
      question+=" "+taggedWords[i][0];
      i++;
    }
    question+="?";
    console.log(question);
    var url = "http://"+ window.location.host+ "/proxy/?q="+encodeURIComponent(question);
    return fetch(url).then(function(res){
      return res.text();
    }).then(function(text){
      //console.log(text);
      var $ = cheerio.load(text);
      /*var anstext = "";
      if(numberChecker($("._sPg b").text()){
        anstext += numberChecker($("._sPg b").text();
      }
      else{
        var str1 = numberChecker($("._sPg").text()
      }*/
      var anstext = $("#_vBb span").text()+$("._sPg").first().text();
      console.log(anstext,theNumber);
      return compare(anstext, theNumber)
      // console.log($("#_vBb span").text());
      // console.log($("._sPg b").first().text());
    })
  }
}

  //rephrase("Donald Trump is 90 years old");

//rephrase("Barack Obama is 55 years old");

//rephrase("there are 50 states in USA");

//rephrase("there are 20 players on a NFL roster");

//rephrase("there are 10 continents in the world")

//rephrase("there are 20 ")

//rephrase("George has 12 cats");

//rephrase("6 senators voted against the bill");

//rephrase("20 million died in chicago last year");

//rephrase("Melania Trump gets 6 points");

//rephrase("there are 3 senators per state");


global.compare = function(num, theNumber){
  if(num.trim() == "")
    return true
  var thenuminnum;
  var numarray = num.split(" ");

  numarray.every(function(word){
    if("1234567890".search(word.charAt(0)) != -1 || !isNaN(WtN.convert(word))){
      thenuminnum = word;
      return false;

    }
    return true
  })


  if(Number(thenuminnum) != Number(theNumber)){
    // console.log("false")
    return false
  }
  else
    return true
}