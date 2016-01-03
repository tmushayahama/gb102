var collaborationTimelinesManager = function ($http, $q) {

 var CollaborationTimelinesManager = function () {
  this.collaborationTimelines = [];
 };
 CollaborationTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationTimelinesManager.prototype.getCollaborationTimelines = function (collaborationId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationTimelines = [];
  $http.get('/api/collaboration/' + collaborationId + '/timelines').success(function (data) {
   self.collaborationTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTimelinesManager.prototype.getCollaborationTimeline = function (collaborationId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationTimelines = [];
  $http.get('/api/collaboration/' + collaborationId + '/timeline/' + timelineId).success(function (data) {
   self.collaborationTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTimelinesManager.prototype.createCollaborationTimeline = function (collaborationTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/timeline/create',
   data: collaborationTimelineData
  }).success(function (data) {
   self.collaborationTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTimelinesManager.prototype.editCollaborationTimeline = function (collaborationTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/timeline/edit',
   data: collaborationTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CollaborationTimelinesManager;
};

collaborationTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.collaborations').service('CollaborationTimelinesManager', collaborationTimelinesManager);
