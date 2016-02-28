var teachTodosSrv = function ($http, $q) {

 var TeachTodosSrv = function () {
  this.teachTodos = [];
 };
 TeachTodosSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachTodosSrv.prototype.getTeachTodos = function (teachId) {
  var self = this;
  var deferred = $q.defer();
  self.teachTodos = [];
  $http.get('/api/teach/' + teachId + '/todos').success(function (data) {
   self.teachTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTodosSrv.prototype.getTeachTodo = function (teachId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.teachTodos = [];
  $http.get('/api/teach/' + teachId + '/todo/' + todoId).success(function (data) {
   self.teachTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTodosSrv.prototype.createTeachTodo = function (teachTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/todo/create',
   data: teachTodoData
  }).success(function (data) {
   self.teachTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachTodosSrv.prototype.editTeachTodo = function (teachTodoData) {
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


 return TeachTodosSrv;
};

teachTodosSrv.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachTodosSrv', teachTodosSrv);