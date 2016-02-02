var adviceCommentsManager = function ($http, $q) {

 var AdviceCommentsManager = function () {
  this.adviceComments = [];
 };
 AdviceCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceCommentsManager.prototype.getAdviceComments = function (adviceId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceComments = [];
  $http.get('/api/advice/' + adviceId + '/comments').success(function (data) {
   self.adviceComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceCommentsManager.prototype.getAdviceComment = function (adviceId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceComments = [];
  $http.get('/api/advice/' + adviceId + '/comment/' + commentId).success(function (data) {
   self.adviceComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceCommentsManager.prototype.createAdviceComment = function (adviceCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/comment/create',
   data: adviceCommentData
  }).success(function (data) {
   self.adviceComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceCommentsManager.prototype.editAdviceComment = function (adviceCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/comment/edit',
   data: adviceCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return AdviceCommentsManager;
};

adviceCommentsManager.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceCommentsManager', adviceCommentsManager);
