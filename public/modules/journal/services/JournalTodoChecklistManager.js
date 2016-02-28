var journalTodoChecklistSrv = function ($http, $q) {

 var JournalTodoChecklistSrv = function () {
  this.journalTodoChecklist = [];
 };
 JournalTodoChecklistSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalTodoChecklistSrv.prototype.getJournalTodoChecklist = function (todoId) {
  var self = this;
  var deferred = $q.defer();
  self.journalTodoChecklist = [];
  $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
   self.journalTodoChecklist = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTodoChecklistSrv.prototype.getJournalTodoChecklistItem = function (journalId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/journal/' + journalId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTodoChecklistSrv.prototype.createJournalTodoChecklistItem = function (journalTodoChecklistData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/create',
   data: journalTodoChecklistData
  }).success(function (data) {
   self.journalTodoChecklist.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTodoChecklistSrv.prototype.editJournalTodoChecklistItem = function (journalTodoData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/todo/checklist/edit',
   data: journalTodoData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return JournalTodoChecklistSrv;
};

journalTodoChecklistSrv.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalTodoChecklistSrv', journalTodoChecklistSrv);