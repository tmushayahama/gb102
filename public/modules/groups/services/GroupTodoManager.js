var groupTodoManager = function ($http, $q) {

 var GroupTodoManager = function () {
  this.groupTodos = [];
 };
 GroupTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 GroupTodoManager.prototype.getGroupTodo = function (groupId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/group/' + groupId + '/todo/' + todoId).success(function (data) {
   self.groupTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GroupTodoManager.prototype.editGroupTodo = function (groupTodoData) {
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

 return GroupTodoManager;
};
groupTodoManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupTodoManager', groupTodoManager);
