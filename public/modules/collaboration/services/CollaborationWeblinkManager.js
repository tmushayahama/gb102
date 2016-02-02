var collaborationWeblinkManager = function ($http, $q) {

 var CollaborationWeblinkManager = function () {
  this.collaborationWeblinks = [];
 };
 CollaborationWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CollaborationWeblinkManager.prototype.getCollaborationWeblink = function (collaborationId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/collaboration/' + collaborationId + '/weblink/' + weblinkId).success(function (data) {
   self.collaborationWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CollaborationWeblinkManager.prototype.editCollaborationWeblink = function (collaborationWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/weblink/edit',
   data: collaborationWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return CollaborationWeblinkManager;
};

collaborationWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.collaboration').service('CollaborationWeblinkManager', collaborationWeblinkManager);