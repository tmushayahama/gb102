var collaborationNotesManager = function ($http, $q) {

 var CollaborationNotesManager = function () {
  this.collaborationNotes = [];
 };
 CollaborationNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CollaborationNotesManager.prototype.getCollaborationNotes = function (collaborationId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationNotes = [];
  $http.get('/api/collaboration/' + collaborationId + '/notes').success(function (data) {
   self.collaborationNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationNotesManager.prototype.getCollaborationNote = function (collaborationId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.collaborationNotes = [];
  $http.get('/api/collaboration/' + collaborationId + '/note/' + noteId).success(function (data) {
   self.collaborationNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationNotesManager.prototype.createCollaborationNote = function (collaborationNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/note/create',
   data: collaborationNoteData
  }).success(function (data) {
   self.collaborationNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CollaborationNotesManager.prototype.editCollaborationNote = function (collaborationNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/collaboration/note/edit',
   data: collaborationNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CollaborationNotesManager;
};

collaborationNotesManager.$inject = ['$http', '$q'];

angular.module('app.collaboration').service('CollaborationNotesManager', collaborationNotesManager);