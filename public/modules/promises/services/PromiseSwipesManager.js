var promiseSwipesManager = function ($http, $q) {

 var PromiseSwipesManager = function () {
  this.promiseSwipes = [];
 };
 PromiseSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 PromiseSwipesManager.prototype.getPromiseSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.promiseSwipes = [];
  $http.get('/api/promises/swipes').success(function (data) {
   self.promiseSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 PromiseSwipesManager.prototype.getPromiseSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.promise = [];
  $http.get('/api/promises/swipe').success(function (data) {
   self.promise = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseSwipesManager.prototype.createPromiseSwipe = function (promiseSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promises/swipe/create',
   data: promiseSwipeData
  }).success(function (data) {
   self.promiseSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseSwipesManager.prototype.editPromise = function (promiseData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promiseedit',
   data: promiseData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return PromiseSwipesManager;
};

promiseSwipesManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseSwipesManager', promiseSwipesManager);

