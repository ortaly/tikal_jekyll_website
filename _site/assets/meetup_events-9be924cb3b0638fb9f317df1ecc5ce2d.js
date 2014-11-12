(function(){

	'use strict';

	var Sn = {};
	var module = angular.module('meetups-module', []);

	Sn.MeetupsApiParams = {
		baseApiUrl: 'https://api.meetup.com',
		callback: 'JSON_CALLBACK',
		group_urlname: 'full-stack-developer-il',
		text_format: 'plain',
		key: '6b7b184b5a2b2e3fa2a3e216517e42',
		sign: true
	};

	Sn.SiteParams = {
		baseUrl: ''
	};

	module.constant('MeetupsApiParams', Sn.MeetupsApiParams);
	module.constant('SiteParams', Sn.SiteParams);

	module.service('MeetupsService', ['$http', 'MeetupsApiParams', '$q', function($http, MeetupsApiParams, $q){

		function getJSONPParams(status, offset, page, desc){
			var params = {
				status: status,
				offset: offset,
				page: page,
				desc:desc
			};

			if(angular.isDefined(desc)){
				params.desc = desc;
			}

			params = angular.extend(params, MeetupsApiParams);
			delete params.baseApiUrl;

			return params;
		}

		return {

			getMeetups: function(status, offset, page, desc){
				var defer = $q.defer(),
				    params = getJSONPParams(status, offset, page, desc);


				function onSuccess(data){
					defer.resolve(data.results);
				}

				function onError(data, status, headers, config){
					//debugger;
					defer.reject('Faild to load meetups'+status.data);
				}

				$http.jsonp(
					MeetupsApiParams.baseApiUrl+'/2/events',
					{params: params}
				)
					.success(onSuccess)
					.error(onError);

				return defer.promise;
			},
			getMeetupRsvps: function(meetupId){
				var defer = $q.defer(),
				    apiUrl =
					    [MeetupsApiParams.baseApiUrl, '2', 'rsvps'].join('/'),
				    params = {
					    callback: MeetupsApiParams.callback,
					    key: MeetupsApiParams.key,
					    event_id: meetupId
				    };


				function onSuccess(data){
					defer.resolve(data.results);
				}

				function onError(data, status, headers, config){
					defer.reject('Faild to load meetups');
				}

				$http.jsonp(apiUrl, {params: params})
					.success(onSuccess)
					.error(onError);
				return defer.promise;
			},
			getMeetupAttendance: function(meetupId){
				var defer = $q.defer(),
				    apiUrl = [
					    MeetupsApiParams.baseApiUrl,
					    MeetupsApiParams.group_urlname,
					    'events',
					    meetupId,
					    'attendance'
				    ].join('/'),
				    params = {
					    callback: MeetupsApiParams.callback,
					    key: MeetupsApiParams.key,
					    sign: MeetupsApiParams.sign
				    };


				function onSuccess(data){
					defer.resolve(data.results);
				}

				function onError(data, status, headers, config){
					defer.reject('Faild to load meetups');
				}

				$http.jsonp(apiUrl, {params: params})
					.success(onSuccess)
					.error(onError);

				return defer.promise;
			}
		};
	}]);


	module.controller('Sn.MainCtrl', ['$scope', function($scope){

		var _self = this;

		this.displayUpComing = function displayUpComing(){
			this.isUpComing = true;
			this.isPast = false;
		};

		this.displayPast = function displayPast(){
			this.isPast = true;
			this.isUpComing = false;
		};

		(function init(){
			_self.displayUpComing();
		})();

	}]);

	module.controller('Sn.MeetupsCtrl', ['$scope', 'MeetupsService', function($scope, MeetupsService){

		var _self = this,
		    lastOffset = 0;

		function onUpComingSuccess(meetups){
			_self.meetupsByStatus.upcoming = meetups;
			var i = 0,
			    len = meetups.length;

			for(; i < len; ++i){
				console.log("meetups[i] = ", meetups[i]);
				MeetupsService.getMeetupRsvps(meetups[i].id).then(function(data){
					if (data.length > 0) {
						_self.meetupsRsvps[data[0].event.id] = data;
					}
				});
			}
		}

		function onPastSuccess(meetups){
			var i = 0,
			    len = meetups.length;


			for(; i < len; ++i){
				_self.meetupsByStatus.past.push(meetups[i]);
				MeetupsService.getMeetupRsvps(meetups[i].id).then(function(data){
					if(data.length>0){
						_self.meetupsRsvps[data[0].event.id] = data;
					}
				});
			}

		}

		function onError(data){
			//debugger;
		}

		function loadPastEvents(offset){
			MeetupsService
				.getMeetups('past', offset, 3, 'true')
				.then(
					onPastSuccess,
					onError
				);
		}

		_self.loadMore = function loadMore(){
			loadPastEvents(++lastOffset);
		};

		(function init(){

			_self.meetupsByStatus = {
				upcoming: [],
				past: []
			};
			_self.meetupsRsvps = {};

			MeetupsService
				.getMeetups('upcoming', 0, 20)
				.then(
					onUpComingSuccess,
					onError
				);

			loadPastEvents(lastOffset);


		})();
	}]);


	module.directive('meetupEvent', ['$location', function($location){

		return {
			restrict: 'E',
			templateUrl:'/events/meetup-event.html',
			replace: true,
			scope: {
				meetups: '=',
				title: '@',
				isUpcomingEvent: '@',
				rsvps: '='
			},
			link: function (scope, element) {
				var waitlistText = 'Waiting List',
				    rsvpText = 'RSVP',
				    waitlistClass = 'event-waitlist',
				    rsvpClass = 'event-rsvp';

				scope.isWaitlist = function (meetup) {
					return meetup.yes_rsvp_count >= meetup.rsvp_limit || meetup.waitlist_count;
				};

				scope.waitlistRsvpClass = function (meetup) {
					return scope.isWaitlist(meetup) ? waitlistClass : rsvpClass;
				};

				scope.waitlistRsvpText = function (meetup) {
					return scope.isWaitlist(meetup) ? waitlistText : rsvpText;
				};
			}
		};
	}]);

	module.directive('meetupListEvent', ['$location', function($location){

		return {
			restrict: 'E',
			templateUrl:'/block-meetup-event.html',
			replace: true,
			scope: {
				meetups: '=',
				title: '@',
				isUpcomingEvent: '@',
				rsvps: '='
			},
			link: function(scope, element){
			}
		};
	}]);

})();
