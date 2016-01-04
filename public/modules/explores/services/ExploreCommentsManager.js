var exploreCommentsManager = function ($http, $q) {

 var ExploreCommentsManager = function () {
  this.exploreComments = [];
 };
 ExploreCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreCommentsManager.prototype.getExploreComments = function (exploreId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreComments = [];
  $http.get('/api/explore/' + exploreId + '/comments').success(function (data) {
   self.exploreComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreCommentsManager.prototype.getExploreComment = function (exploreId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreComments = [];
  $http.get('/api/explore/' + exploreId + '/comment/' + commentId).success(function (data) {
   self.exploreComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreCommentsManager.prototype.createExploreComment = function (exploreCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/comment/create',
   data: exploreCommentData
  }).success(function (data) {
   self.exploreComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreCommentsManager.prototype.editExploreComment = function (exploreCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/comment/edit',
   data: exploreCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExploreCommentsManager;
};

exploreCommentsManager.$inject = ['$http', '$q'];

angular.module('app.explores').service('ExploreCommentsManager', exploreCommentsManager);
