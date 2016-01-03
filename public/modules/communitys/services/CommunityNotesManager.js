var communityNotesManager = function ($http, $q) {

 var CommunityNotesManager = function () {
  this.communityNotes = [];
 };
 CommunityNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 CommunityNotesManager.prototype.getCommunityNotes = function (communityId) {
  var self = this;
  var deferred = $q.defer();
  self.communityNotes = [];
  $http.get('/api/community/' + communityId + '/notes').success(function (data) {
   self.communityNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityNotesManager.prototype.getCommunityNote = function (communityId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.communityNotes = [];
  $http.get('/api/community/' + communityId + '/note/' + noteId).success(function (data) {
   self.communityNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityNotesManager.prototype.createCommunityNote = function (communityNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/note/create',
   data: communityNoteData
  }).success(function (data) {
   self.communityNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 CommunityNotesManager.prototype.editCommunityNote = function (communityNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/community/note/edit',
   data: communityNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return CommunityNotesManager;
};

communityNotesManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityNotesManager', communityNotesManager);