var journalNoteSrv = function ($http, $q) {

 var JournalNoteSrv = function () {
  this.journalNotes = [];
 };
 JournalNoteSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 JournalNoteSrv.prototype.getJournalNote = function (journalId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/journal/' + journalId + '/note/' + noteId).success(function (data) {
   self.journalNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 JournalNoteSrv.prototype.editJournalNote = function (journalNoteData) {
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

 return JournalNoteSrv;
};

journalNoteSrv.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalNoteSrv', journalNoteSrv);