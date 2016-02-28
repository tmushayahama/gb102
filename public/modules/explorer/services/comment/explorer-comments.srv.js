var explorerCommentsSrv = function ($http, $q) {

 var ExplorerCommentsSrv = function () {
  this.explorerComments = [];
 };
 ExplorerCommentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerCommentsSrv.prototype.getExplorerComments = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerComments = [];
  $http.get('/api/explorer/' + explorerId + '/comments').success(function (data) {
   self.explorerComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerCommentsSrv.prototype.getExplorerComment = function (explorerId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerComments = [];
  $http.get('/api/explorer/' + explorerId + '/comment/' + commentId).success(function (data) {
   self.explorerComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerCommentsSrv.prototype.createExplorerComment = function (explorerCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/comment/create',
   data: explorerCommentData
  }).success(function (data) {
   self.explorerComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerCommentsSrv.prototype.editExplorerComment = function (explorerCommentData) {
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


 return ExplorerCommentsSrv;
};

explorerCommentsSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerCommentsSrv', explorerCommentsSrv);
