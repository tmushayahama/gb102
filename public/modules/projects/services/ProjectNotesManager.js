var projectNotesManager = function ($http, $q) {

 var ProjectNotesManager = function () {
  this.projectNotes = [];
 };
 ProjectNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProjectNotesManager.prototype.getProjectNotes = function (projectId) {
  var self = this;
  var deferred = $q.defer();
  self.projectNotes = [];
  $http.get('/api/project/' + projectId + '/notes').success(function (data) {
   self.projectNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectNotesManager.prototype.getProjectNote = function (projectId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.projectNotes = [];
  $http.get('/api/project/' + projectId + '/note/' + noteId).success(function (data) {
   self.projectNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectNotesManager.prototype.createProjectNote = function (projectNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/project/note/create',
   data: projectNoteData
  }).success(function (data) {
   self.projectNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProjectNotesManager.prototype.editProjectNote = function (projectNoteData) {
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


 return ProjectNotesManager;
};

projectNotesManager.$inject = ['$http', '$q'];

angular.module('app.projects').service('ProjectNotesManager', projectNotesManager);