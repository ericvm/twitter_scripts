console.log("The script started\n\n");

var Twit = require('twit');
const keys = require("./secret_keys");
var T = new Twit(keys);

// get people that follow you
function getFollowers(){
    return new Promise( (resolve,reject) => {
    T.get('followers/ids', (err,data) => {
        if(err){ reject(err); }
        else{ resolve(data.ids);}
    });
    }).then(result => result);
}

// get People that you follow
function getFriends(){
    return new Promise( (resolve,reject) => {
    T.get('friends/ids', (err,data) => {
        if(err){ reject(err); }
        else{ resolve(data.ids);}
    });
    }).then(result => result);
}



function getIdFromScreenName(user){
    return new Promise((resolve,reject) => {
        T.get('users/show', {screen_name: user}, (err,data) => {
            if(err){reject(err);}
            else{
		resolve(data.id);}
        });
    }).then(result => result);
}

function getScreenNameFromId(id){
    return new Promise((resolve,reject) => {
        T.get('users/show', {id: id}, (err,data) => {
            if(err){reject(err);}
            else{resolve(data.screen_name);}
        });
    }).then(result => result);
}




// build friendlist
function buildFriendlist(friend_list) {
    return Promise.all( friend_list.map(friend => getIdFromScreenName(friend) ) ).then(result => result);
}

function kill(friend_id){

	T.post('friendships/destroy', {id: friend_id},
	   (err,data) => {
	       if(err){
		   console.log(err.message + " Id: " + friend_id);
	       }
	       else{
		   console.log("unfollowed "+ data.screen_name);
	       }
	   });

}


function unfollowAll(followers, friends, friend_list){
    friends.forEach( friend => {
	// if friend is not in friend_list and is not your follower
	if( friend_list.indexOf(friend) < 0 && followers.indexOf(friend) < 0){
	    kill(friend);
	}
    }); 
}


var friend_list = ["larochkk", "paulaemcima", "phaser_"];

// Promise.all(
//     [getFollowers(), getFriends(), buildFriendlist(friend_list)]
// ).then( ([followers, friends, friend_list]) => {
//     console.log(followers.length, friends.length, friend_list);

//     unfollowAll(followers,friends, friend_list);

// });

//getScreenNameFromId(981656935744331800);

//getIdFromScreenName("jihoonielovely");

// T.post('friendships/destroy', {screen_name: 'ThaboTotal'},
// 	   (err,data) => {
// 	       if(err){
// 		   console.log(err.message );
// 	       }
// 	       else{
// 		   console.log("unfollowed "+ data.screen_name);
// 	       }
// 	   });

// T.get('users/show', {screen_name: "jihoonielovely"}, (err,data) => {
//             if(err){console.log(err);}
//             else{console.log(data.id);}
//         });

// kill(1001612331590139900);



new Promise( (resolve,reject) => {
    T.get('friends/list', (err,data) => {
        if(err){ reject(err); }
        else{ resolve(data);}
    });
}).then(result => {
    // result = result.map(x => x.screen_name);
    console.log(result);
});

