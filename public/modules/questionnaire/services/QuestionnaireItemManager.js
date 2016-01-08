var swipeManager = function ($http, $q) {

 var SwipeManager = function () {
  this.swipe = [];
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

 SwipeManager.prototype.getSwipe = function (swipeId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/swipe/' + swipeId).success(function (data) {
   self.swipe = data;
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
   url: '/api/swipe/edit',
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
