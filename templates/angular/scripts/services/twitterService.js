var challengeAppServices = angular.module('challengeApp.Services', [])
.factory('twitterService', ['$http',
    function($http){
    var root = {};
    root.filters = {};
    root.getTweets = function(screen_name, count){
        var conf = {
         url    : _CONFIG.twitterBaseUrl+"1.1/statuses/user_timeline.json?count="+count+"&screen_name="+screen_name
        };
        return $http(conf);
    };
   
    return root;
}]);