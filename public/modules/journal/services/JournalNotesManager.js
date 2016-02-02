var journalNotesManager = function ($http, $q) {

 var JournalNotesManager = function () {
  this.journalNotes = [];
 };
 JournalNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalNotesManager.prototype.getJournalNotes = function (journalId) {
  var self = this;
  var deferred = $q.defer();
  self.journalNotes = [];
  $http.get('/api/journal/' + journalId + '/notes').success(function (data) {
   self.journalNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalNotesManager.prototype.getJournalNote = function (journalId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.journalNotes = [];
  $http.get('/api/journal/' + journalId + '/note/' + noteId).success(function (data) {
   self.journalNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalNotesManager.prototype.createJournalNote = function (journalNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/note/create',
   data: journalNoteData
  }).success(function (data) {
   self.journalNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalNotesManager.prototype.editJournalNote = function (journalNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/note/edit',
   data: journalNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return JournalNotesManager;
};

journalNotesManager.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalNotesManager', journalNotesManager);