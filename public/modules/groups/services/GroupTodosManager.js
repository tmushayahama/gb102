var groupTodosManager = function ($http, $q) {

 var GroupTodosManager = function () {
  this.groupTodos = [];
 };
 GroupTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupTodosManager.prototype.getGroupTodos = function (groupId) {
  var self = this;
  var deferred = $q.defer();
  self.groupTodos = [];
  $http.get('/api/group/' + groupId + '/todos').success(function (data) {
   self.groupTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTodosManager.prototype.getGroupTodo = function (groupId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.groupTodos = [];
  $http.get('/api/group/' + groupId + '/todo/' + todoId).success(function (data) {
   self.groupTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTodosManager.prototype.createGroupTodo = function (groupTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/todo/create',
   data: groupTodoData
  }).success(function (data) {
   self.groupTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupTodosManager.prototype.editGroupTodo = function (groupTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/todo/edit',
   data: groupTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GroupTodosManager;
};

groupTodosManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupTodosManager', groupTodosManager);