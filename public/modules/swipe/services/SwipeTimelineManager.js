var swipeProgressManager = function ($http, $q) {

 var SwipeProgressManager = function () {
  this.swipeProgress = [];
 };
 SwipeProgressManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SwipeProgressManager.prototype.getSwipeProgress = function (swipeId, progressId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/swipe/' + swipeId + '/progress/' + progressId).success(function (data) {
   self.swipeProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SwipeProgressManager.prototype.editSwipeProgress = function (swipeProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/progress/edit',
   data: swipeProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return SwipeProgressManager;
};

swipeProgressManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeProgressManager', swipeProgressManager);