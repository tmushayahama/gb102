var adviceSwipesManager = function ($http, $q) {

 var AdviceSwipesManager = function () {
  this.adviceSwipes = [];
 };
 AdviceSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceSwipesManager.prototype.getAdviceSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.adviceSwipes = [];
  $http.get('/api/advices/swipes').success(function (data) {
   self.adviceSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 AdviceSwipesManager.prototype.getAdviceSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.advice = [];
  $http.get('/api/advices/swipe').success(function (data) {
   self.advice = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceSwipesManager.prototype.createAdviceSwipe = function (adviceSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advices/swipe/create',
   data: adviceSwipeData
  }).success(function (data) {
   self.adviceSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceSwipesManager.prototype.editAdvice = function (adviceData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/adviceedit',
   data: adviceData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return AdviceSwipesManager;
};

adviceSwipesManager.$inject = ['$http', '$q'];

angular.module('app.advices').service('AdviceSwipesManager', adviceSwipesManager);

