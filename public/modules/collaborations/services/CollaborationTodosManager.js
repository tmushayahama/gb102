var collaborationTodosManager = function ($http, $q) {

 var CollaborationTodosManager = function () {
  this.collaborationTodos = [];
 };
 CollaborationTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationTodosManager.prototype.getCollaborationTodos = function (collaborationId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationTodos = [];
  $http.get('/api/collaboration/' + collaborationId + '/todos').success(function (data) {
   self.collaborationTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTodosManager.prototype.getCollaborationTodo = function (collaborationId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationTodos = [];
  $http.get('/api/collaboration/' + collaborationId + '/todo/' + todoId).success(function (data) {
   self.collaborationTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTodosManager.prototype.createCollaborationTodo = function (collaborationTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/todo/create',
   data: collaborationTodoData
  }).success(function (data) {
   self.collaborationTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationTodosManager.prototype.editCollaborationTodo = function (collaborationTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/todo/edit',
   data: collaborationTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CollaborationTodosManager;
};

collaborationTodosManager.$inject = ['$http', '$q'];

angular.module('app.collaborations').service('CollaborationTodosManager', collaborationTodosManager);