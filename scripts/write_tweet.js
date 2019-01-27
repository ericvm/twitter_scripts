/* * * * * * * * * * * * * * * * * * * * * * * *
 * This script was made by Laura Viglioni      *
 * https://github.com/viglioni                 *
 * 2018                                        *
 * License: GNU GENERAL PUBLIC LICENSE v3      *
 * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * To run this script you must install:        *
 * > node                                      *
 * > lib 'twit' https://github.com/ttezel/twit *
 * About the secret_keys, I recommend          *
 * this class https://youtu.be/7-nX3YOC4O      *
 * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * usage:                                      *
 *    $ node write_tweet.js "text in quotes"   *
 *       img1 img2 img3 img4                   *
 *                                             *
 * all img are optional                        *
 * * * * * * * * * * * * * * * * * * * * * * * */

console.log("The script started\n\n");

var Twit = require('twit');
const keys = require("../modules/secret_keys");
var T = new Twit(keys);

// tweet text, may be longer than 280 char
const text = process.argv[2];
// Img(s') path -- optional.
const imgs = process.argv.filter( (x,index) => index > 2 && index < 7);

const tweetMaxSize = 280;


/**
 * Post tweet
 */
// lambda function that tweet the thread from 'text' and images from 'imgs'
// The promise is used to get (asynchronously) the imgs media_id, if any.
Promise.all(
    imgs.map(x => getMediaId(x))
).then(ids => TweetAll(text, ids));



/*
 * Used functions
 */


// This function (promise) gets (resolve) a twitter img media_id given a source path
function getMediaId(src){
    return new Promise(function(resolve,reject){
	T.postMediaChunked({ file_path: src }, function (err, data, response) {
	    if(!err){
		console.log(data);
		resolve(data.media_id_string);
            }
	    else
		reject(err);
	});
    }).then(result => result);
}

//  Gets the text, calls the function that breaks it into an array of text (280 char or less) and organize them in a thread
function TweetAll(text,ids){
    let text_array = TextToArray(text);
    let tweet = text_array.shift();
    Tweet(tweet,ids,[]).then(tweet_id => TweetThread(text_array,tweet_id));
}


// This function effectively post a tweet with a text (under 280 char) and imgs if any
// Promise resolve tweet id for threading purposes or reject if something went wrong
function Tweet(tweet_text,img_ids,reply_id){
    return new Promise(function(resolve,reject){
	if(tweet_text) {
	    if(tweet_text.length <= tweetMaxSize){
    		T.post('statuses/update',
    		       { status: tweet_text , media_ids: img_ids, in_reply_to_status_id: reply_id},
    		       function(err, data, response) {
    			   console.log(data);
			   if(!err){
			       console.log("Tweet posted!");
			       resolve(data.id_str);
			   }
			   else{reject("THERE WAS AN ERROR!!!\n"+err+"\nERROR");}
    		       });
	    }else{reject("ERROR: Tweet cannot be longer than 280 characters!!!\n");}
	}else{reject("Run script with: $node write_tweet.js 'tweet text' img1 img2 img3 img4 \n");}
    });
}


// This function generate a thread with tweets, if there are more than one tweet to be posted
function TweetThread(text_array,tweet_id){
    if(text_array.length){
	let tweet = text_array.shift();
	Tweet(tweet,[],tweet_id).then(tweet_id =>TweetThread(text_array,tweet_id));
    }
}

// This function breaks the text (any length > 0) variable in several shorter texts (< 280 char), if necessary
function TextToArray(text){
    if(text.length < tweetMaxSize){ return [text] }
    else{
	let tweet = "";
	let array = text.split(" ");
	let text_array = [];
	array.forEach(function(word){
	    if(word.length <= tweetMaxSize){
		if(tweet.length + word.length < tweetMaxSize){
		    tweet += " " + word;
		}
		else{
		    text_array.push(tweet);
		    tweet = word;
		}
	    }
	    else {
		let n = tweetMaxSize - 1 - tweet.length;
		let first_half = word.substr(n);
		let scnd_half = word.substr(word.length - n);
		tweet += " " + first_half;
		text_array.push(tweet);
		tweet = scnd_half;
	    }
	});
	text_array.push(tweet);
	return text_array;
    }
}









