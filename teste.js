console.log("The script started\n\n");

var Twit = require('twit');
const keys = require("./secret_keys");
var T = new Twit(keys);

new Promise( (resolve, reject) => {
    T.get('followers/ids', (err,data) => {
        if(err){ reject(err); }
        else {
            console.log(data);
            resolve(data.ids);
        }
    });    
}).then(result => {
    result.forEach(x => {
        T.post('friendships/create', {id: x}, (err,data) => {
            if(err){console.log(err);}
            else{console.log(data);}
        });
    });
});


