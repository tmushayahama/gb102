var teachTodoManager = function ($http, $q) {

 var TeachTodoManager = function () {
  this.teachTodos = [];
 };
 TeachTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 TeachTodoManager.prototype.getTeachTodo = function (teachId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/teach/' + teachId + '/todo/' + todoId).success(function (data) {
   self.teachTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 TeachTodoManager.prototype.editTeachTodo = function (teachTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/todo/edit',
   data: teachTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return TeachTodoManager;
};
teachTodoManager.$inject = ['$http', '$q'];

angular.module('app.teachs').service('TeachTodoManager', teachTodoManager);
