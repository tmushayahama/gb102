var communityTimelineManager = function ($http, $q) {

 var CommunityTimelineManager = function () {
  this.communityTimelines = [];
 };
 CommunityTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CommunityTimelineManager.prototype.getCommunityTimeline = function (communityId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/community/' + communityId + '/timeline/' + timelineId).success(function (data) {
   self.communityTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CommunityTimelineManager.prototype.editCommunityTimeline = function (communityTimelineData) {
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

 return CommunityTimelineManager;
};

communityTimelineManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityTimelineManager', communityTimelineManager);