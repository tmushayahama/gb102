var adviceTodosManager = function ($http, $q) {

 var AdviceTodosManager = function () {
  this.adviceTodos = [];
 };
 AdviceTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceTodosManager.prototype.getAdviceTodos = function (adviceId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceTodos = [];
  $http.get('/api/advice/' + adviceId + '/todos').success(function (data) {
   self.adviceTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTodosManager.prototype.getAdviceTodo = function (adviceId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceTodos = [];
  $http.get('/api/advice/' + adviceId + '/todo/' + todoId).success(function (data) {
   self.adviceTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTodosManager.prototype.createAdviceTodo = function (adviceTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/todo/create',
   data: adviceTodoData
  }).success(function (data) {
   self.adviceTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceTodosManager.prototype.editAdviceTodo = function (adviceTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/todo/edit',
   data: adviceTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return AdviceTodosManager;
};

adviceTodosManager.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceTodosManager', adviceTodosManager);