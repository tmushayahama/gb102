var explorerDiscussionSrv = function ($http, $q) {

 var ExplorerDiscussionSrv = function () {
  this.explorerDiscussions = [];
 };
 ExplorerDiscussionSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerDiscussionSrv.prototype.getExplorerDiscussion = function (explorerId, discussionId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/discussion/' + discussionId).success(function (data) {
   self.explorerDiscussion = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerDiscussionSrv.prototype.editExplorerDiscussion = function (explorerDiscussionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/discussion/edit',
   data: explorerDiscussionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExplorerDiscussionSrv;
};

explorerDiscussionSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerDiscussionSrv', explorerDiscussionSrv);
