var promiseCommentManager = function ($http, $q) {

 var PromiseCommentManager = function () {
  this.promiseComments = [];
 };
 PromiseCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 PromiseCommentManager.prototype.getPromiseComment = function (promiseId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/promise/' + promiseId + '/comment/' + commentId).success(function (data) {
   self.promiseComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 PromiseCommentManager.prototype.editPromiseComment = function (promiseCommentData) {
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

 return PromiseCommentManager;
};

promiseCommentManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseCommentManager', promiseCommentManager);
