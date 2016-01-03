var collaborationNoteManager = function ($http, $q) {

 var CollaborationNoteManager = function () {
  this.collaborationNotes = [];
 };
 CollaborationNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CollaborationNoteManager.prototype.getCollaborationNote = function (collaborationId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/collaboration/' + collaborationId + '/note/' + noteId).success(function (data) {
   self.collaborationNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CollaborationNoteManager.prototype.editCollaborationNote = function (collaborationNoteData) {
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

 return CollaborationNoteManager;
};

collaborationNoteManager.$inject = ['$http', '$q'];

angular.module('app.collaborations').service('CollaborationNoteManager', collaborationNoteManager);