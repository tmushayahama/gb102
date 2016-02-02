var journalTodosManager = function ($http, $q) {

 var JournalTodosManager = function () {
  this.journalTodos = [];
 };
 JournalTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalTodosManager.prototype.getJournalTodos = function (journalId) {
  var self = this;
  var deferred = $q.defer();
  self.journalTodos = [];
  $http.get('/api/journal/' + journalId + '/todos').success(function (data) {
   self.journalTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTodosManager.prototype.getJournalTodo = function (journalId, todoId) {
  var self = this;
  var deferred = $q.defer();
  self.journalTodos = [];
  $http.get('/api/journal/' + journalId + '/todo/' + todoId).success(function (data) {
   self.journalTodos = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTodosManager.prototype.createJournalTodo = function (journalTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/todo/create',
   data: journalTodoData
  }).success(function (data) {
   self.journalTodos.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTodosManager.prototype.editJournalTodo = function (journalTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/todo/edit',
   data: journalTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return JournalTodosManager;
};

journalTodosManager.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalTodosManager', journalTodosManager);