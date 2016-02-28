var goalWeblinksSrv = function ($http, $q) {

 var GoalWeblinksSrv = function () {
  this.goalWeblinks = [];
 };
 GoalWeblinksSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GoalWeblinksSrv.prototype.getGoalWeblinks = function (goalId) {
  var self = this;
  var deferred = $q.defer();
  self.goalWeblinks = [];
  $http.get('/api/goal/' + goalId + '/weblinks').success(function (data) {
   self.goalWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalWeblinksSrv.prototype.getGoalWeblink = function (goalId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.goalWeblinks = [];
  $http.get('/api/goal/' + goalId + '/weblink/' + weblinkId).success(function (data) {
   self.goalWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalWeblinksSrv.prototype.createGoalWeblink = function (goalWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/weblink/create',
   data: goalWeblinkData
  }).success(function (data) {
   self.goalWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GoalWeblinksSrv.prototype.editGoalWeblink = function (goalWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/goal/weblink/edit',
   data: goalWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GoalWeblinksSrv;
};


goalWeblinksSrv.$inject = ['$http', '$q'];

angular.module('app.goal').service('GoalWeblinksSrv', goalWeblinksSrv);