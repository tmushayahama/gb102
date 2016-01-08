var swipeCommentsManager = function ($http, $q) {

 var SwipeCommentsManager = function () {
  this.swipeComments = [];
 };
 SwipeCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SwipeCommentsManager.prototype.getSwipeComments = function (swipeId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeComments = [];
  $http.get('/api/swipe/' + swipeId + '/comments').success(function (data) {
   self.swipeComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeCommentsManager.prototype.getSwipeComment = function (swipeId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeComments = [];
  $http.get('/api/swipe/' + swipeId + '/comment/' + commentId).success(function (data) {
   self.swipeComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeCommentsManager.prototype.createSwipeComment = function (swipeCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/comment/create',
   data: swipeCommentData
  }).success(function (data) {
   self.swipeComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeCommentsManager.prototype.editSwipeComment = function (swipeCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/comment/edit',
   data: swipeCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SwipeCommentsManager;
};

swipeCommentsManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeCommentsManager', swipeCommentsManager);
