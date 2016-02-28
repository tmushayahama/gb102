var adviceCommentSrv = function ($http, $q) {

 var AdviceCommentSrv = function () {
  this.adviceComments = [];
 };
 AdviceCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 AdviceCommentSrv.prototype.getAdviceComment = function (adviceId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/advice/' + adviceId + '/comment/' + commentId).success(function (data) {
   self.adviceComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 AdviceCommentSrv.prototype.editAdviceComment = function (adviceCommentData) {
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

 return AdviceCommentSrv;
};

adviceCommentSrv.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceCommentSrv', adviceCommentSrv);
