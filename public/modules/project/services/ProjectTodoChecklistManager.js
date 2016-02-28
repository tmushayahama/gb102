var projectTodoChecklistSrv = function ($http, $q) {

 var ProjectTodoChecklistSrv = function () {
  this.projectTodoChecklist = [];
 };
 ProjectTodoChecklistSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectTodoChecklistSrv.prototype.getProjectTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.projectTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.projectTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTodoChecklistSrv.prototype.getProjectTodoChecklistItem = function (projectId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/project/' + projectId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTodoChecklistSrv.prototype.createProjectTodoChecklistItem = function (projectTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: projectTodoChecklistData
  }).success(function (data) {
   self.projectTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTodoChecklistSrv.prototype.editProjectTodoChecklistItem = function (projectTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: projectTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProjectTodoChecklistSrv;
};

projectTodoChecklistSrv.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectTodoChecklistSrv', projectTodoChecklistSrv);