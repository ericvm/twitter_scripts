/* * * * * * * * * * * * * * * * * * * * * * * *
 * This script was made by Laura Viglioni      *
 * https://github.com/viglioni                 *
 * 2019                                        *
 * License: GNU GENERAL PUBLIC LICENSE v3      *
 * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * To run this script you must install:        *
 * > node                                      *
 * > lib 'twit' https://github.com/ttezel/twit *
 * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * usage:                                      *
 *    $ node follow1000.js                     *
 * * * * * * * * * * * * * * * * * * * * * * * */

console.log("The script started\n\n");

var Twit = require('twit');
const keys = require("../modules/secret_keys");
var T = new Twit(keys);
var Connections = require("../modules/connections");
var IdList = require("../modules/id_list");

// People you do not want to follow
const enemy_list = [];

// Max number of people you want to follow, default is 100
var max = 10;

Promise.all( [
    Connections.getMyFriends(),
    Connections.getFollowersFrom("detremura"),
    IdList.buildIdList(enemy_list)
]).then( ([friends, people_to_follow, list]) => {
    let counter = 0;
    console.log(friends.length, people_to_follow.length, list);

    people_to_follow.forEach(person =>{
    	// if person isnt in your friendlist already and is not in your enemy_list
    	if(friends.indexOf(person) < 0 && list.indexOf(person) < 0 && counter < max){
	    Connections.follow(person);
	    counter++;
    	}
    });
});


