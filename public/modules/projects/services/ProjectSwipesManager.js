var projectSwipesManager = function ($http, $q) {

 var ProjectSwipesManager = function () {
  this.projectSwipes = [];
 };
 ProjectSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectSwipesManager.prototype.getProjectSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.projectSwipes = [];
  $http.get('/api/projects/swipes').success(function (data) {
   self.projectSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProjectSwipesManager.prototype.getProjectSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.project = [];
  $http.get('/api/projects/swipe').success(function (data) {
   self.project = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectSwipesManager.prototype.createProjectSwipe = function (projectSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/projects/swipe/create',
   data: projectSwipeData
  }).success(function (data) {
   self.projectSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectSwipesManager.prototype.editProject = function (projectData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/projectedit',
   data: projectData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return ProjectSwipesManager;
};

projectSwipesManager.$inject = ['$http', '$q'];

angular.module('app.projects').service('ProjectSwipesManager', projectSwipesManager);

