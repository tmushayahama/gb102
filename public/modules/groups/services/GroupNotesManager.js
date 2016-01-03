var groupNotesManager = function ($http, $q) {

 var GroupNotesManager = function () {
  this.groupNotes = [];
 };
 GroupNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupNotesManager.prototype.getGroupNotes = function (groupId) {
  var self = this;
  var deferred = $q.defer();
  self.groupNotes = [];
  $http.get('/api/group/' + groupId + '/notes').success(function (data) {
   self.groupNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupNotesManager.prototype.getGroupNote = function (groupId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.groupNotes = [];
  $http.get('/api/group/' + groupId + '/note/' + noteId).success(function (data) {
   self.groupNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupNotesManager.prototype.createGroupNote = function (groupNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/note/create',
   data: groupNoteData
  }).success(function (data) {
   self.groupNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupNotesManager.prototype.editGroupNote = function (groupNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/note/edit',
   data: groupNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GroupNotesManager;
};

groupNotesManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupNotesManager', groupNotesManager);