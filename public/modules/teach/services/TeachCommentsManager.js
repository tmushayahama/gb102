var teachCommentsSrv = function ($http, $q) {

 var TeachCommentsSrv = function () {
  this.teachComments = [];
 };
 TeachCommentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachCommentsSrv.prototype.getTeachComments = function (teachId) {
  var self = this;
  var deferred = $q.defer();
  self.teachComments = [];
  $http.get('/api/teach/' + teachId + '/comments').success(function (data) {
   self.teachComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachCommentsSrv.prototype.getTeachComment = function (teachId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.teachComments = [];
  $http.get('/api/teach/' + teachId + '/comment/' + commentId).success(function (data) {
   self.teachComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachCommentsSrv.prototype.createTeachComment = function (teachCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/comment/create',
   data: teachCommentData
  }).success(function (data) {
   self.teachComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachCommentsSrv.prototype.editTeachComment = function (teachCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/comment/edit',
   data: teachCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return TeachCommentsSrv;
};

teachCommentsSrv.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachCommentsSrv', teachCommentsSrv);
