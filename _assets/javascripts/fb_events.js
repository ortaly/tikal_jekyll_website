(function(){

	'use strict';

	var eventsModule = angular.module('events-module', []);

	eventsModule.service('FBDataService', ['$http', '$window', '$q', function($http, $window, $q){
		fb = $window.FB;

		fb.init({
			appId: '334506690062624',
			status: true, 
			cookie: true, 
			xfbml: true
		});

		this.getData = function () {
			var deferred = $q.defer();
				fb.api(
					"/v2.2/225585444263260/feed?access_token=334506690062624|wYA-QpptpE0UZBjBTicmS2JKkIU",
					function (response) {
						if(response.error){
							deferred.reject(response.error);
						} else if (response && !response.error) {
							deferred.resolve(response);
						}
					});

				return deferred.promise;
			
		}

	}]);

	eventsModule.controller('FeedCtrl', ['$scope', 'FBDataService', function($scope, FBDataService){
		$scope.data = [];

		FBDataService.getData().then(function(res){
			var feeds = res.data.slice(0,5);
			for (var i=0; i<feeds.length; i++){
				var id = feeds[i].id; 
				var feedId = [];
				feedId.push(id.substring(0,id.indexOf("_")));
				feedId.push(id.substring(id.indexOf("_")+1));

				var feed = {
					image: "https://graph.facebook.com/" + feeds[i].from.id + "/picture",
					authorName: feeds[i].from.name,
					profilePage: "https://www.facebook.com/app_scoped_user_id/" + feeds[i].from.id,
					created: feeds[i].created_time,
					message: feeds[i].message,
					postMessage: "https://www.facebook.com/" + feedId[0] + "/posts/" + feedId[1]
				}

				$scope.data.push(feed);
			}

		},function(reason){
			console.log(reason);
		});
	}]);


	eventsModule.filter('dateSuffix', function($filter) {
	  var suffixes = ["th", "st", "nd", "rd"];
	  return function(input) {
	    var dtfilter = $filter('date')(input, 'MMM, dd');
	    var day = parseInt(dtfilter.slice(-2));
	    var relevantDigits = (day < 30) ? day % 20 : day % 30;
	    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
	    return dtfilter+suffix;
	  };
	});


	eventsModule.filter('cut', function () {
	    return function (value, wordwise, max, tail) {
	        if (!value) return '';

	        max = parseInt(max, 10);
	        if (!max) return value;
	        if (value.length <= max) return value;

	        value = value.substr(0, max);
	        if (wordwise) {
	            var lastspace = value.lastIndexOf(' ');
	            if (lastspace != -1) {
	                value = value.substr(0, lastspace);
	            }
	        }

	        return value + (tail || ' …');
	    };
	});

})();
