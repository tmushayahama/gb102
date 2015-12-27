var promiseManager = function ($http, $q) {

 var PromiseManager = function () {
  this.promise = [];
 };
 PromiseManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 PromiseManager.prototype.getPromise = function (promiseId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/promise/' + promiseId).success(function (data) {
   self.promise = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 PromiseManager.prototype.editPromise = function (promiseData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/edit',
   data: promiseData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return PromiseManager;
};

promiseManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseManager', promiseManager);
