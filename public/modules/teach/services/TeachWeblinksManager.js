var teachWeblinksManager = function ($http, $q) {

 var TeachWeblinksManager = function () {
  this.teachWeblinks = [];
 };
 TeachWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachWeblinksManager.prototype.getTeachWeblinks = function (teachId) {
  var self = this;
  var deferred = $q.defer();
  self.teachWeblinks = [];
  $http.get('/api/teach/' + teachId + '/weblinks').success(function (data) {
   self.teachWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachWeblinksManager.prototype.getTeachWeblink = function (teachId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.teachWeblinks = [];
  $http.get('/api/teach/' + teachId + '/weblink/' + weblinkId).success(function (data) {
   self.teachWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachWeblinksManager.prototype.createTeachWeblink = function (teachWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/weblink/create',
   data: teachWeblinkData
  }).success(function (data) {
   self.teachWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachWeblinksManager.prototype.editTeachWeblink = function (teachWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/weblink/edit',
   data: teachWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return TeachWeblinksManager;
};


teachWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachWeblinksManager', teachWeblinksManager);