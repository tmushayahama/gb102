var explorerCommentSrv = function ($http, $q) {

 var ExplorerCommentSrv = function () {
  this.explorerComments = [];
 };
 ExplorerCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerCommentSrv.prototype.getExplorerComment = function (explorerId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/comment/' + commentId).success(function (data) {
   self.explorerComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerCommentSrv.prototype.editExplorerComment = function (explorerCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/comment/edit',
   data: explorerCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExplorerCommentSrv;
};

explorerCommentSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerCommentSrv', explorerCommentSrv);
