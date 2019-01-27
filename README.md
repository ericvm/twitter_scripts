# Twitter scripts
Some scripts using twitter API, nodeJS and [Twit](https://github.com/ttezel/twit) by @ttezel

## install
```shell
npm install twit
```

## files
| scripts | path | description |
|-|-|-|
|write_tweet | ./scripts/write_tweet.js | write a tweet or thread if text length is bigger than 280 with 0 to 4 images |
|follow_back | ./scripts/follow_back.js | follow back everyone, except people you explicit list |
|unfollow | ./scripts/unfollow.js | unfollow everyone that does not follows you back, except people you explicit list |

| modules | path | description |
|-|-|-|
| id_list | ./modules/id_list.js | builds a list of ids based in a list of screen_names |
| connection | ./modules/connection.js | several functions about followers or friends |
| secret_keys | ./modules/secret_keys.js.example | example of how your secret_keys.js file must look like |

## Detailed explanation
### write_tweet.js
This script allows you to post tweets with text and (up to) four images. If the text is longer than 280, the script will automatically organize them in a thread :)

usage:
```bash
 $ node write_tweets.js "tweet text in quotes!" path/to/img1_(optional) path/to/img2_(optional) path/to/img3_(optional) path/to/img4_(optional) 
 ```

### follow_back.js
This script will follow back all the people in your list, except people you list in variable
```js
var enemy_list = []
```
Twitter API limits 1000 follow requests per day and the script will check only your 5k first followers and friends.
For more than that, check out about [**cursoring**](https://developer.twitter.com/en/docs/basics/cursoring) in Docs page.


### unfollow.js
This script will unfollow everyone that does not follow you back and is not in your friend_list in variable
```js
var friend_list = []
```
Twitter API limits 1000 follow requests per day and the script will check only your 5k first followers and friends.
For more than that, check out about [**cursoring**](https://developer.twitter.com/en/docs/basics/cursoring) in Docs page.

