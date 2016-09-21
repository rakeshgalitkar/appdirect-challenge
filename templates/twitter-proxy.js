var twitterProxyServer = require('twitter-proxy');
var _CONFIG = require('./config');

twitterProxyServer({
  "consumerKey": _CONFIG.consumerKey,
  "consumerSecret": _CONFIG.consumerSecret,
  "accessToken": _CONFIG.accessToken,
  "accessTokenSecret": _CONFIG.accessTokenSecret,
  "port": _CONFIG.port
});
