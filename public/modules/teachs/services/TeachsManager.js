var teachsManager = function ($http, $q) {

 var TeachsManager = function () {
  this.teachs = [];
 };
 TeachsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachsManager.prototype.getAllTeachs = function () {
  var self = this;
  var deferred = $q.defer();
  self.teachs = [];
  $http.get('/api/teachs/all').success(function (data) {
   self.teachs = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsManager.prototype.getMyTeachs = function () {
  var self = this;
  var deferred = $q.defer();
  self.teachs = [];
  $http.get('/api/teachs/mine').success(function (data) {
   self.teachs = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsManager.prototype.getTeach = function (teachId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.teach = [];
  $http.get('/api/teach/' + teachId + '//' + Id).success(function (data) {
   self.teach = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsManager.prototype.createTeach = function (teachData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/create',
   data: teachData
  }).success(function (data) {
   self.teachs.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsManager.prototype.editTeach = function (teachData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teachedit',
   data: teachData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return TeachsManager;
};

teachsManager.$inject = ['$http', '$q'];

angular.module('app.teachs').service('TeachsManager', teachsManager);

