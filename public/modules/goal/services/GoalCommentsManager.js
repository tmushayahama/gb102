var goalCommentsManager = function ($http, $q) {

 var GoalCommentsManager = function () {
  this.goalComments = [];
 };
 GoalCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GoalCommentsManager.prototype.getGoalComments = function (goalId) {
  var self = this;
  var deferred = $q.defer();
  self.goalComments = [];
  $http.get('/api/goal/' + goalId + '/comments').success(function (data) {
   self.goalComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalCommentsManager.prototype.getGoalComment = function (goalId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.goalComments = [];
  $http.get('/api/goal/' + goalId + '/comment/' + commentId).success(function (data) {
   self.goalComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalCommentsManager.prototype.createGoalComment = function (goalCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/comment/create',
   data: goalCommentData
  }).success(function (data) {
   self.goalComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalCommentsManager.prototype.editGoalComment = function (goalCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/comment/edit',
   data: goalCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GoalCommentsManager;
};

goalCommentsManager.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalCommentsManager', goalCommentsManager);
