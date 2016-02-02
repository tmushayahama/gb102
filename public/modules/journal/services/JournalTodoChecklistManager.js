var journalTodoChecklistManager = function ($http, $q) {

 var JournalTodoChecklistManager = function () {
  this.journalTodoChecklist = [];
 };
 JournalTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalTodoChecklistManager.prototype.getJournalTodoChecklist = function (todoId) {
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

 JournalTodoChecklistManager.prototype.getJournalTodoChecklistItem = function (journalId, todoId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/journal/' + journalId + '/todo/' + todoId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTodoChecklistManager.prototype.createJournalTodoChecklistItem = function (journalTodoChecklistData) {
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

 JournalTodoChecklistManager.prototype.editJournalTodoChecklistItem = function (journalTodoData) {
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


 return JournalTodoChecklistManager;
};

journalTodoChecklistManager.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalTodoChecklistManager', journalTodoChecklistManager);