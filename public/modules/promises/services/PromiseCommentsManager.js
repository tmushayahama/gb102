var promiseCommentsManager = function ($http, $q) {

 var PromiseCommentsManager = function () {
  this.promiseComments = [];
 };
 PromiseCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 PromiseCommentsManager.prototype.getPromiseComments = function (promiseId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseComments = [];
  $http.get('/api/promise/' + promiseId + '/comments').success(function (data) {
   self.promiseComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseCommentsManager.prototype.getPromiseComment = function (promiseId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseComments = [];
  $http.get('/api/promise/' + promiseId + '/comment/' + commentId).success(function (data) {
   self.promiseComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseCommentsManager.prototype.createPromiseComment = function (promiseCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/comment/create',
   data: promiseCommentData
  }).success(function (data) {
   self.promiseComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseCommentsManager.prototype.editPromiseComment = function (promiseCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/comment/edit',
   data: promiseCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return PromiseCommentsManager;
};

promiseCommentsManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseCommentsManager', promiseCommentsManager);
