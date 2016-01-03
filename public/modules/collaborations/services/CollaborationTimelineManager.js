var collaborationTimelineManager = function ($http, $q) {

 var CollaborationTimelineManager = function () {
  this.collaborationTimelines = [];
 };
 CollaborationTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CollaborationTimelineManager.prototype.getCollaborationTimeline = function (collaborationId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/collaboration/' + collaborationId + '/timeline/' + timelineId).success(function (data) {
   self.collaborationTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CollaborationTimelineManager.prototype.editCollaborationTimeline = function (collaborationTimelineData) {
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

 return CollaborationTimelineManager;
};

collaborationTimelineManager.$inject = ['$http', '$q'];

angular.module('app.collaborations').service('CollaborationTimelineManager', collaborationTimelineManager);