var promiseTodoManager = function ($http, $q) {

 var PromiseTodoManager = function () {
  this.promiseTodos = [];
 };
 PromiseTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 PromiseTodoManager.prototype.getPromiseTodo = function (promiseId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/promise/' + promiseId + '/todo/' + todoId).success(function (data) {
   self.promiseTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 PromiseTodoManager.prototype.editPromiseTodo = function (promiseTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/todo/edit',
   data: promiseTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return PromiseTodoManager;
};
promiseTodoManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseTodoManager', promiseTodoManager);
