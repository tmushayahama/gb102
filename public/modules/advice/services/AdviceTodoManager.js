var adviceTodoManager = function ($http, $q) {

 var AdviceTodoManager = function () {
  this.adviceTodos = [];
 };
 AdviceTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 AdviceTodoManager.prototype.getAdviceTodo = function (adviceId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/advice/' + adviceId + '/todo/' + todoId).success(function (data) {
   self.adviceTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 AdviceTodoManager.prototype.editAdviceTodo = function (adviceTodoData) {
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

 return AdviceTodoManager;
};
adviceTodoManager.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceTodoManager', adviceTodoManager);
