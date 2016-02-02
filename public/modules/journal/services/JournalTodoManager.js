var journalTodoManager = function ($http, $q) {

 var JournalTodoManager = function () {
  this.journalTodos = [];
 };
 JournalTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 JournalTodoManager.prototype.getJournalTodo = function (journalId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/journal/' + journalId + '/todo/' + todoId).success(function (data) {
   self.journalTodo = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 JournalTodoManager.prototype.editJournalTodo = function (journalTodoData) {
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

 return JournalTodoManager;
};
journalTodoManager.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalTodoManager', journalTodoManager);
