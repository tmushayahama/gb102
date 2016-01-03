var projectTodoManager = function ($http, $q) {

 var ProjectTodoManager = function () {
  this.projectTodos = [];
 };
 ProjectTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProjectTodoManager.prototype.getProjectTodo = function (projectId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/project/' + projectId + '/todo/' + todoId).success(function (data) {
   self.projectTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProjectTodoManager.prototype.editProjectTodo = function (projectTodoData) {
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

 return ProjectTodoManager;
};
projectTodoManager.$inject = ['$http', '$q'];

angular.module('app.projects').service('ProjectTodoManager', projectTodoManager);
