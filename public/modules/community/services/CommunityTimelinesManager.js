var communityTimelinesManager = function ($http, $q) {

 var CommunityTimelinesManager = function () {
  this.communityTimelines = [];
 };
 CommunityTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
  if (!data || typeof data !== 'object') {
   this.error = 'Error';
  }
  if (!this.error && data.result && data.result.error) {
   this.error = data.result.error;
  }
  if (!this.error && data.error) {
   this.error = data.error.message;
  }
  if (!this.error && defaultMsg) {
   this.error = defaultMsg;
  }
  if (this.error) {
   return deferred.reject(data);
  }
  return deferred.resolve(data);
 };

 CommunityTimelinesManager.prototype.getCommunityTimelines = function (communityId) {
  var self = this;
  var deferred = $q.defer();
  self.communityTimelines = [];
  $http.get('/api/community/' + communityId + '/timelines').success(function (data) {
   self.communityTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTimelinesManager.prototype.getCommunityTimeline = function (communityId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.communityTimelines = [];
  $http.get('/api/community/' + communityId + '/timeline/' + timelineId).success(function (data) {
   self.communityTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTimelinesManager.prototype.createCommunityTimeline = function (communityTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/timeline/create',
   data: communityTimelineData
  }).success(function (data) {
   self.communityTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityTimelinesManager.prototype.editCommunityTimeline = function (communityTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/timeline/edit',
   data: communityTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CommunityTimelinesManager;
};

communityTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityTimelinesManager', communityTimelinesManager);
