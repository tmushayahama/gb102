var journalTodoSrv = function ($http, $q) {

 var JournalTodoSrv = function () {
  this.journalTodos = [];
 };
 JournalTodoSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 JournalTodoSrv.prototype.getJournalTodo = function (journalId, todoId) {
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


 JournalTodoSrv.prototype.editJournalTodo = function (journalTodoData) {
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

 return JournalTodoSrv;
};
journalTodoSrv.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalTodoSrv', journalTodoSrv);
