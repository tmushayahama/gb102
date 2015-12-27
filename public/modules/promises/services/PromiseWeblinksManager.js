var promiseWeblinksManager = function ($http, $q) {

 var PromiseWeblinksManager = function () {
  this.promiseWeblinks = [];
 };
 PromiseWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 PromiseWeblinksManager.prototype.getPromiseWeblinks = function (promiseId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseWeblinks = [];
  $http.get('/api/promise/' + promiseId + '/weblinks').success(function (data) {
   self.promiseWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseWeblinksManager.prototype.getPromiseWeblink = function (promiseId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseWeblinks = [];
  $http.get('/api/promise/' + promiseId + '/weblink/' + weblinkId).success(function (data) {
   self.promiseWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseWeblinksManager.prototype.createPromiseWeblink = function (promiseWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/weblink/create',
   data: promiseWeblinkData
  }).success(function (data) {
   self.promiseWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseWeblinksManager.prototype.editPromiseWeblink = function (promiseWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/weblink/edit',
   data: promiseWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return PromiseWeblinksManager;
};


promiseWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseWeblinksManager', promiseWeblinksManager);