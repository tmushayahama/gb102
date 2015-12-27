var hobbyNotesManager = function ($http, $q) {

 var HobbyNotesManager = function () {
  this.hobbyNotes = [];
 };
 HobbyNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 HobbyNotesManager.prototype.getHobbyNotes = function (hobbyId) {
  var self = this;
  var deferred = $q.defer();
  self.hobbyNotes = [];
  $http.get('/api/hobby/' + hobbyId + '/notes').success(function (data) {
   self.hobbyNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyNotesManager.prototype.getHobbyNote = function (hobbyId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.hobbyNotes = [];
  $http.get('/api/hobby/' + hobbyId + '/note/' + noteId).success(function (data) {
   self.hobbyNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyNotesManager.prototype.createHobbyNote = function (hobbyNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobby/note/create',
   data: hobbyNoteData
  }).success(function (data) {
   self.hobbyNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyNotesManager.prototype.editHobbyNote = function (hobbyNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobby/note/edit',
   data: hobbyNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return HobbyNotesManager;
};

hobbyNotesManager.$inject = ['$http', '$q'];

angular.module('app.hobbys').service('HobbyNotesManager', hobbyNotesManager);