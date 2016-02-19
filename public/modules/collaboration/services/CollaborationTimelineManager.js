var collaborationProgressManager = function ($http, $q) {

 var CollaborationProgressManager = function () {
  this.collaborationProgress = [];
 };
 CollaborationProgressManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CollaborationProgressManager.prototype.getCollaborationProgress = function (collaborationId, progressId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/collaboration/' + collaborationId + '/progress/' + progressId).success(function (data) {
   self.collaborationProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CollaborationProgressManager.prototype.editCollaborationProgress = function (collaborationProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/progress/edit',
   data: collaborationProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return CollaborationProgressManager;
};

collaborationProgressManager.$inject = ['$http', '$q'];

angular.module('app.collaboration').service('CollaborationProgressManager', collaborationProgressManager);