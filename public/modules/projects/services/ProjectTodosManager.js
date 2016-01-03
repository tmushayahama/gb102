var projectTodosManager = function ($http, $q) {

 var ProjectTodosManager = function () {
  this.projectTodos = [];
 };
 ProjectTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectTodosManager.prototype.getProjectTodos = function (projectId) {
  var self = this;
  var deferred = $q.defer();
  self.projectTodos = [];
  $http.get('/api/project/' + projectId + '/todos').success(function (data) {
   self.projectTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTodosManager.prototype.getProjectTodo = function (projectId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.projectTodos = [];
  $http.get('/api/project/' + projectId + '/todo/' + todoId).success(function (data) {
   self.projectTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTodosManager.prototype.createProjectTodo = function (projectTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/todo/create',
   data: projectTodoData
  }).success(function (data) {
   self.projectTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectTodosManager.prototype.editProjectTodo = function (projectTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/todo/edit',
   data: projectTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProjectTodosManager;
};

projectTodosManager.$inject = ['$http', '$q'];

angular.module('app.projects').service('ProjectTodosManager', projectTodosManager);