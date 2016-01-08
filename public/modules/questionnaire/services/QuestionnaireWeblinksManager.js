var swipeWeblinksManager = function ($http, $q) {

 var SwipeWeblinksManager = function () {
  this.swipeWeblinks = [];
 };
 SwipeWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SwipeWeblinksManager.prototype.getSwipeWeblinks = function (swipeId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeWeblinks = [];
  $http.get('/api/swipe/' + swipeId + '/weblinks').success(function (data) {
   self.swipeWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeWeblinksManager.prototype.getSwipeWeblink = function (swipeId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeWeblinks = [];
  $http.get('/api/swipe/' + swipeId + '/weblink/' + weblinkId).success(function (data) {
   self.swipeWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeWeblinksManager.prototype.createSwipeWeblink = function (swipeWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/weblink/create',
   data: swipeWeblinkData
  }).success(function (data) {
   self.swipeWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeWeblinksManager.prototype.editSwipeWeblink = function (swipeWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/weblink/edit',
   data: swipeWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SwipeWeblinksManager;
};


swipeWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeWeblinksManager', swipeWeblinksManager);