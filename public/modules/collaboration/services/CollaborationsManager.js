var collaborationsManager = function ($http, $q) {

 var CollaborationsManager = function () {
  this.collaborations = [];
 };
 CollaborationsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationsManager.prototype.getAllCollaborations = function () {
  var self = this;
  var deferred = $q.defer();
  //self.collaborations = [];
  $http.get('/api/collaborations/all').success(function (data) {
   //self.collaborations = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationsManager.prototype.getAppCollaborations = function (appName) {
  var self = this;
  var deferred = $q.defer();
  // self.collaborations = [];
  $http.get('/api/collaborations/all/' + appName).success(function (data) {
   //self.collaborations = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationsManager.prototype.getMyCollaborations = function () {
  var self = this;
  var deferred = $q.defer();
  //self.collaborations = [];
  $http.get('/api/collaborations/mine').success(function (data) {
   //self.collaborations = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationsManager.prototype.getCollaboration = function (collaborationId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.collaboration = [];
  $http.get('/api/collaboration/' + collaborationId + '//' + Id).success(function (data) {
   self.collaboration = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationsManager.prototype.createCollaboration = function (collaborationData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/create',
   data: collaborationData
  }).success(function (data) {
   self.collaborations.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationsManager.prototype.editCollaboration = function (collaborationData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaborationedit',
   data: collaborationData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return CollaborationsManager;
};

collaborationsManager.$inject = ['$http', '$q'];

angular.module('app.collaboration').service('CollaborationsManager', collaborationsManager);

