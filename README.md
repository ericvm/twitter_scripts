# twitter_scripts
Some scripts using twitter API, nodeJS and [Twit](https://github.com/ttezel/twit) by @ttezel

## write_tweets.js
This script allows you to post tweets with text and (up to) four images. If the text is longer than 280, the script will automatically organize them in a thread :)

usage:
```bash
 $ node write_tweets.js "tweet text in quotes!" path/to/img1_(optional) path/to/img2_(optional) path/to/img3_(optional) path/to/img4_(optional) 
 ```
