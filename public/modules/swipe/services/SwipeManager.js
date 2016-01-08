var swipeManager = function ($http, $q) {

 var SwipeManager = function () {
  this.swipes = [];
 };
 SwipeManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SwipeManager.prototype.getSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.swipes = [];
  $http.get('/api/swipes/history').success(function (data) {
   self.swipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SwipeManager.prototype.getSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  //self.swipe = [];
  $http.get('/api/swipes/swipe').success(function (data) {
   //self.swipe = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeManager.prototype.createSwipe = function (swipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipes/create',
   data: swipeData
  }).success(function (data) {
   self.swipe.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeManager.prototype.editSwipe = function (swipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipeedit',
   data: swipeData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return SwipeManager;
};

swipeManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeManager', swipeManager);

