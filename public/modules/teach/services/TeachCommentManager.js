var teachCommentSrv = function ($http, $q) {

 var TeachCommentSrv = function () {
  this.teachComments = [];
 };
 TeachCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 TeachCommentSrv.prototype.getTeachComment = function (teachId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/teach/' + teachId + '/comment/' + commentId).success(function (data) {
   self.teachComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 TeachCommentSrv.prototype.editTeachComment = function (teachCommentData) {
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

 return TeachCommentSrv;
};

teachCommentSrv.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachCommentSrv', teachCommentSrv);
