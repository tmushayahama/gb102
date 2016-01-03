var collaborationManager = function ($http, $q) {

 var CollaborationManager = function () {
  this.collaboration = [];
 };
 CollaborationManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationManager.prototype.getCollaboration = function (collaborationId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/collaboration/' + collaborationId).success(function (data) {
   self.collaboration = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CollaborationManager.prototype.editCollaboration = function (collaborationData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/edit',
   data: collaborationData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return CollaborationManager;
};

collaborationManager.$inject = ['$http', '$q'];

angular.module('app.collaborations').service('CollaborationManager', collaborationManager);
