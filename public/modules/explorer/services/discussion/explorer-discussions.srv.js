var explorerDiscussionsSrv = function ($http, $q) {

 var ExplorerDiscussionsSrv = function () {
  this.explorerDiscussions = [];
 };
 ExplorerDiscussionsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerDiscussionsSrv.prototype.getExplorerDiscussions = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerDiscussions = [];
  $http.get('/api/explorer/' + explorerId + '/discussions').success(function (data) {
   self.explorerDiscussions = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerDiscussionsSrv.prototype.getExplorerDiscussion = function (explorerId, discussionId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerDiscussions = [];
  $http.get('/api/explorer/' + explorerId + '/discussion/' + discussionId).success(function (data) {
   self.explorerDiscussions = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerDiscussionsSrv.prototype.createExplorerDiscussion = function (explorerDiscussionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/discussion/create',
   data: explorerDiscussionData
  }).success(function (data) {
   self.explorerDiscussions.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerDiscussionsSrv.prototype.editExplorerDiscussion = function (explorerDiscussionData) {
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


 return ExplorerDiscussionsSrv;
};

explorerDiscussionsSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerDiscussionsSrv', explorerDiscussionsSrv);
