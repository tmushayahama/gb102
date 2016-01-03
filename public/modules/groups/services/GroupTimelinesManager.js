var groupTimelinesManager = function ($http, $q) {

 var GroupTimelinesManager = function () {
  this.groupTimelines = [];
 };
 GroupTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupTimelinesManager.prototype.getGroupTimelines = function (groupId) {
  var self = this;
  var deferred = $q.defer();
  self.groupTimelines = [];
  $http.get('/api/group/' + groupId + '/timelines').success(function (data) {
   self.groupTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTimelinesManager.prototype.getGroupTimeline = function (groupId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.groupTimelines = [];
  $http.get('/api/group/' + groupId + '/timeline/' + timelineId).success(function (data) {
   self.groupTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTimelinesManager.prototype.createGroupTimeline = function (groupTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/timeline/create',
   data: groupTimelineData
  }).success(function (data) {
   self.groupTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTimelinesManager.prototype.editGroupTimeline = function (groupTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/timeline/edit',
   data: groupTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GroupTimelinesManager;
};

groupTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupTimelinesManager', groupTimelinesManager);
