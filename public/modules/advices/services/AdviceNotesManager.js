var adviceNotesManager = function ($http, $q) {

 var AdviceNotesManager = function () {
  this.adviceNotes = [];
 };
 AdviceNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 AdviceNotesManager.prototype.getAdviceNotes = function (adviceId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceNotes = [];
  $http.get('/api/advice/' + adviceId + '/notes').success(function (data) {
   self.adviceNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceNotesManager.prototype.getAdviceNote = function (adviceId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.adviceNotes = [];
  $http.get('/api/advice/' + adviceId + '/note/' + noteId).success(function (data) {
   self.adviceNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceNotesManager.prototype.createAdviceNote = function (adviceNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/note/create',
   data: adviceNoteData
  }).success(function (data) {
   self.adviceNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 AdviceNotesManager.prototype.editAdviceNote = function (adviceNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/note/edit',
   data: adviceNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return AdviceNotesManager;
};

adviceNotesManager.$inject = ['$http', '$q'];

angular.module('app.advices').service('AdviceNotesManager', adviceNotesManager);