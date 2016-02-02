var goalCommentManager = function ($http, $q) {

 var GoalCommentManager = function () {
  this.goalComments = [];
 };
 GoalCommentManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 GoalCommentManager.prototype.getGoalComment = function (goalId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/goal/' + goalId + '/comment/' + commentId).success(function (data) {
   self.goalComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GoalCommentManager.prototype.editGoalComment = function (goalCommentData) {
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

 return GoalCommentManager;
};

goalCommentManager.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalCommentManager', goalCommentManager);
