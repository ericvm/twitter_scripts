/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This script was made by Laura Viglioni          *
 * https://github.com/viglioni                              *
 * 2019                                                               *
 * License: GNU GENERAL PUBLIC LICENSE v3  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * To run this script you must install:         *
 * > node                                                   *
 * > lib 'twit' https://github.com/ttezel/twit *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * *  * * * * * * * *
 * usage:                             *
 *    $ node follow1000.js    *
 * * * * * * * * * * * * * * * *  */

console.log("The script started\n\n");

var Twit = require('twit');
const keys = require("../modules/secret_keys");
var T = new Twit(keys);
var Connections = require("../modules/connections");
var IdList = require("../modules/id_list");

// People you do not want to follow
const ENEMY_LIST = [];

// Max number of people you want to follow, default is 1000
const MAX = 1000;

// The person you want to follow zir followers, e.g. "viglionilaura"
const TARGET = "";


// main method
Promise.all( [ 
    Connections.getMyFriends(),
    Connections.getFollowersFrom( TARGET ),
    IdList.buildIdList( ENEMY_LIST )
])
    .then( ([friends, people_to_follow, list]) => {
        followAfterWait(0, 0, 0, people_to_follow,friends,list);    
    });


// recursive method
/** followAfterWait
 * @param timer (int): time in seconds to wait within this call
 * @param counter (int): how many people you already tried to follow
 * @param index (int): the index of the next person in 'people' array that you are trying to follow
 * @param people (arr): array of IDs of people you want to follow
 * @param friends (arr): array of IDs of people you've already follow
 * @param list (arr): array of IDs of people you don't want to follow
 * @returns void
 */
function followAfterWait(timer, counter,index,people,friends,list) {
    console.log("waiting " + timer + " seconds.");
    if(counter < MAX){
        let person = people[index];
        setTimeout(() => {
            if(friends.indexOf(person) < 0 && list.indexOf(person) < 0){
	        Connections.follow(person);
                let new_timer = Math.floor(Math.random()*100);
                console.log("Id:" + person +". Person number " + (index+1) + " on list. Already followed: " + counter);
                followAfterWait(new_timer, counter+1, index+1,people,friends,list);
            }
            else {
                console.log("Not to follow: " + person +". Person number " + (index+1) + ".");
                followAfterWait(0, counter,index+1, people,friends,list);
            }
            
        }, timer*1000);
    }
    else {
        console.log("Ended!");
    }
}








