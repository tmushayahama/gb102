var teachNotesManager = function ($http, $q) {

 var TeachNotesManager = function () {
  this.teachNotes = [];
 };
 TeachNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachNotesManager.prototype.getTeachNotes = function (teachId) {
  var self = this;
  var deferred = $q.defer();
  self.teachNotes = [];
  $http.get('/api/teach/' + teachId + '/notes').success(function (data) {
   self.teachNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachNotesManager.prototype.getTeachNote = function (teachId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.teachNotes = [];
  $http.get('/api/teach/' + teachId + '/note/' + noteId).success(function (data) {
   self.teachNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachNotesManager.prototype.createTeachNote = function (teachNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/note/create',
   data: teachNoteData
  }).success(function (data) {
   self.teachNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachNotesManager.prototype.editTeachNote = function (teachNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/note/edit',
   data: teachNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return TeachNotesManager;
};

teachNotesManager.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachNotesManager', teachNotesManager);