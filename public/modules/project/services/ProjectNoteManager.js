var projectNoteManager = function ($http, $q) {

 var ProjectNoteManager = function () {
  this.projectNotes = [];
 };
 ProjectNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProjectNoteManager.prototype.getProjectNote = function (projectId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/project/' + projectId + '/note/' + noteId).success(function (data) {
   self.projectNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProjectNoteManager.prototype.editProjectNote = function (projectNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/note/edit',
   data: projectNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ProjectNoteManager;
};

projectNoteManager.$inject = ['$http', '$q'];

angular.module('app.project').service('ProjectNoteManager', projectNoteManager);