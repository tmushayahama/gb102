var goalSwipesManager = function ($http, $q) {

 var GoalSwipesManager = function () {
  this.goalSwipes = [];
 };
 GoalSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GoalSwipesManager.prototype.getGoalSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.goalSwipes = [];
  $http.get('/api/goals/swipes').success(function (data) {
   self.goalSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GoalSwipesManager.prototype.getGoalSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.goal = [];
  $http.get('/api/goals/swipe').success(function (data) {
   self.goal = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalSwipesManager.prototype.createGoalSwipe = function (goalSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goals/swipe/create',
   data: goalSwipeData
  }).success(function (data) {
   self.goalSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalSwipesManager.prototype.editGoal = function (goalData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goaledit',
   data: goalData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return GoalSwipesManager;
};

goalSwipesManager.$inject = ['$http', '$q'];

angular.module('app.goals').service('GoalSwipesManager', goalSwipesManager);

