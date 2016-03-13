var explorerTodoSrv = function ($http, $q) {

 var ExplorerTodoSrv = function () {
  this.explorerTodos = [];
 };
 ExplorerTodoSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerTodoSrv.prototype.getExplorerTodo = function (explorerId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/todo/' + todoId).success(function (data) {
   self.explorerTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerTodoSrv.prototype.editExplorerTodo = function (explorerTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/todo/edit',
   data: explorerTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerTodoSrv.prototype.editTodoStatus = function (todoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/editstatus',
   data: todoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExplorerTodoSrv;
};
explorerTodoSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerTodoSrv', explorerTodoSrv);
