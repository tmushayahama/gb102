var exploreCommentManager = function ($http, $q) {

 var ExploreCommentManager = function () {
  this.exploreComments = [];
 };
 ExploreCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExploreCommentManager.prototype.getExploreComment = function (exploreId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explore/' + exploreId + '/comment/' + commentId).success(function (data) {
   self.exploreComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExploreCommentManager.prototype.editExploreComment = function (exploreCommentData) {
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

 return ExploreCommentManager;
};

exploreCommentManager.$inject = ['$http', '$q'];

angular.module('app.explores').service('ExploreCommentManager', exploreCommentManager);
