var swipesSrv = function ($http, $q) {

 var SwipesSrv = function () {
  this.swipes = [];
 };
 SwipesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SwipesSrv.prototype.getAllSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.swipes = [];
  $http.get('/api/swipes/all').success(function (data) {
   self.swipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipesSrv.prototype.getMySwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.swipes = [];
  $http.get('/api/swipes/mine').success(function (data) {
   self.swipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipesSrv.prototype.getSwipe = function (swipeId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.swipe = [];
  $http.get('/api/swipe/' + swipeId + '//' + Id).success(function (data) {
   self.swipe = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipesSrv.prototype.createSwipe = function (swipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/create',
   data: swipeData
  }).success(function (data) {
   self.swipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipesSrv.prototype.editSwipe = function (swipeData) {
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
 return SwipesSrv;
};

swipesSrv.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipesSrv', swipesSrv);

