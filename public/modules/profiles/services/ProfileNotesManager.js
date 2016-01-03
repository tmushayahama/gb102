var profileNotesManager = function ($http, $q) {

 var ProfileNotesManager = function () {
  this.profileNotes = [];
 };
 ProfileNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileNotesManager.prototype.getProfileNotes = function (profileId) {
  var self = this;
  var deferred = $q.defer();
  self.profileNotes = [];
  $http.get('/api/profile/' + profileId + '/notes').success(function (data) {
   self.profileNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileNotesManager.prototype.getProfileNote = function (profileId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.profileNotes = [];
  $http.get('/api/profile/' + profileId + '/note/' + noteId).success(function (data) {
   self.profileNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileNotesManager.prototype.createProfileNote = function (profileNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/note/create',
   data: profileNoteData
  }).success(function (data) {
   self.profileNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileNotesManager.prototype.editProfileNote = function (profileNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/note/edit',
   data: profileNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProfileNotesManager;
};

profileNotesManager.$inject = ['$http', '$q'];

angular.module('app.profiles').service('ProfileNotesManager', profileNotesManager);