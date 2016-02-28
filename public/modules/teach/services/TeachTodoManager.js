var teachTodoSrv = function ($http, $q) {

 var TeachTodoSrv = function () {
  this.teachTodos = [];
 };
 TeachTodoSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 TeachTodoSrv.prototype.getTeachTodo = function (teachId, todoId) {
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


 TeachTodoSrv.prototype.editTeachTodo = function (teachTodoData) {
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

 return TeachTodoSrv;
};
teachTodoSrv.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachTodoSrv', teachTodoSrv);
