var Twit = require('twit');
const keys = require("./secret_keys");
var T = new Twit(keys);



module.exports = {
    
    getIdFromScreenName: function(user){
	return new Promise((resolve,reject) => {
            T.get('users/show', {screen_name: user}, (err,data) => {
		if(err){reject(err);}
		else{
		    resolve(data.id_str);}
            });
	}).then(result => result);
    },

    buildIdList: function(list) {
	return Promise.all( list.map(friend => this.getIdFromScreenName(friend) ) ).then(result => result);
    }
    
};
