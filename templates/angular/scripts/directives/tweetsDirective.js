var challengeAppDirective = angular.module('challengeApp.Directive', ['ngSanitize'])
.directive('tweets', function(twitterService){
	return {
		restrict: 'EA',
		templateUrl : "views/tweets.html",
		
        link: function (scope, elem, attrs, controller) {
        	scope.screenName = attrs.name;
        	scope.getData(attrs.name)
        },	
        controller:function($scope, $rootScope){  
        	$scope.tweets = [];
        	$scope.screenName = '';
        	$scope.wait = false;
        	$scope.noTweets = false;
        	
        	$rootScope.$on('refresh', function(){
        		$scope.getData($scope.screenName);
        	});

        	$scope.getData = function(screenName){
        		$scope.tweets = [];
        		$scope.wait = true;
        		$scope.noTweets = false;
        		twitterService.getTweets($scope.screenName,twitterService.filters.numTweets).then(function(res){
					//success function
					$scope.tweets = res.data;
					$scope.wait = false;
					if(!$scope.tweets.length){
						$scope.noTweets = true;
					}
				},
				function(res){
					//Error function
					$scope.wait = false;
					$scope.noTweets = true;
					console.log("Error" + res);
				});

        	};
        	
        	
        }
	};
});

challengeAppDirective.filter('formatTweet', function ($sce) {
    return function (tweet, type) {
    	var tweetArr = tweet.split(' ');
    	if(tweetArr.length){
    		for(var i in tweetArr){
    			if(tweetArr[i].indexOf('@') !== -1 || tweetArr[i].indexOf('#') !== -1){
    				tweetArr[i] = "<span class='highlight'>"+tweetArr[i]+"</span>";
    			}
    			if(tweetArr[i].indexOf('https://') !== -1 || tweetArr[i].indexOf('https://') !== -1){
    				tweetArr[i] = "<a class='highlight' href="+tweetArr[i]+" taget='_BLANK'>"+tweetArr[i]+"</a>";
    			}
    		}
    		tweet = tweetArr.join(' '); 
    	}

      	return tweet;
    };
});

challengeAppDirective.filter('formatDate', function () {
        return function (tdate, wordwise, max, tail) {
            if (!tdate) return '';

			var K = function () {
			    var a = navigator.userAgent;
			    return {
			        ie: a.match(/MSIE\s([^;]*)/)
			    }
			}();

            var system_date = new Date(Date.parse(tdate));
		    var user_date = new Date();
		    if (K.ie) {
		        system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
		    }
		    var diff = Math.floor((user_date - system_date) / 1000);
		    if (diff <= 1) {return "just now";}
		    if (diff < 20) {return diff + " seconds ago";}
		    if (diff < 40) {return "half a minute ago";}
		    if (diff < 60) {return "less than a minute ago";}
		    if (diff <= 90) {return "one minute ago";}
		    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
		    if (diff <= 5400) {return "1 hour ago";}
		    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
		    if (diff <= 129600) {return "1 day ago";}
		    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
		    if (diff <= 777600) {return "1 week ago";}
		    
		    var dateArr = system_date.toString().split(" ");
		    return dateArr[0]+ " " + dateArr[1] + " " + dateArr[2] + " "+ dateArr[3];
            
        };
    });
