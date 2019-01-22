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



// Promise.all(
//     [getFollowers(), getFriends()]
// ).then( ([followers, friends]) => {
//     console.log(followers.length, friends.length);
// });

function getIdFromScreenName(user){
    return new Promise((resolve,reject) => {
        T.get('users/show', {screen_name: user}, (err,data) => {
            if(err){reject(err);}
            else{resolve(data.id);}
        });
    }).then(result => result);
}



// T.get('users/show', { screen_name: 'larochkk' },  function (err, data, response) {
//     console.log(data);
// });
