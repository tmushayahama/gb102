var promiseTodoChecklistManager = function ($http, $q) {

 var PromiseTodoChecklistManager = function () {
  this.promiseTodoChecklist = [];
 };
 PromiseTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 PromiseTodoChecklistManager.prototype.getPromiseTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.promiseTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseTodoChecklistManager.prototype.getPromiseTodoChecklistItem = function (promiseId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/promise/' + promiseId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseTodoChecklistManager.prototype.createPromiseTodoChecklistItem = function (promiseTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: promiseTodoChecklistData
  }).success(function (data) {
   self.promiseTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseTodoChecklistManager.prototype.editPromiseTodoChecklistItem = function (promiseTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: promiseTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return PromiseTodoChecklistManager;
};

promiseTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseTodoChecklistManager', promiseTodoChecklistManager);