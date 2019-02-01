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
var max = 1;
var timer = 0;
var old =0;

function followOne(friends,person,list){
   	// if person isnt in your friendlist already and is not in your enemy_list
    if(friends.indexOf(person) < 0 && list.indexOf(person) < 0){
	Connections.follow(person);
    }
}

function followAfterWait(timer, counter,people,friends,list) {
    if(counter < 100){
        console.log("waiting " + timer + " seconds");
        let person = people[counter];
        setTimeout(() => {
            if(friends.indexOf(person) < 0 && list.indexOf(person) < 0){
	        Connections.follow(person);
                followAfterWait(Math.floor(Math.random()*30), counter+1, people,friends,list);
            }
            else {
                followAfterWait(0, counter, people,friends,list);
            }
            
        }, timer*1000);
    }
    else {
        console.log("Ended!");
    }
}

Promise.all( [
    Connections.getMyFriends(),
    Connections.getFollowersFrom("detremura"),
    IdList.buildIdList(enemy_list)
]).then( ([friends, people_to_follow, list]) => {
    let counter = 0;
    console.log(friends.length, people_to_follow.length, list);

    followAfterWait(0, counter,people_to_follow,friends,list);
    
});







