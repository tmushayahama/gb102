var collaborationWeblinksManager = function ($http, $q) {

 var CollaborationWeblinksManager = function () {
  this.collaborationWeblinks = [];
 };
 CollaborationWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationWeblinksManager.prototype.getCollaborationWeblinks = function (collaborationId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationWeblinks = [];
  $http.get('/api/collaboration/' + collaborationId + '/weblinks').success(function (data) {
   self.collaborationWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationWeblinksManager.prototype.getCollaborationWeblink = function (collaborationId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationWeblinks = [];
  $http.get('/api/collaboration/' + collaborationId + '/weblink/' + weblinkId).success(function (data) {
   self.collaborationWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationWeblinksManager.prototype.createCollaborationWeblink = function (collaborationWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/weblink/create',
   data: collaborationWeblinkData
  }).success(function (data) {
   self.collaborationWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationWeblinksManager.prototype.editCollaborationWeblink = function (collaborationWeblinkData) {
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


 return CollaborationWeblinksManager;
};


collaborationWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.collaborations').service('CollaborationWeblinksManager', collaborationWeblinksManager);