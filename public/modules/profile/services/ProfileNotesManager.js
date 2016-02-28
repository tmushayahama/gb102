var profileNotesSrv = function ($http, $q) {

 var ProfileNotesSrv = function () {
  this.profileNotes = [];
 };
 ProfileNotesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileNotesSrv.prototype.getProfileNotes = function (profileId) {
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

 ProfileNotesSrv.prototype.getProfileNote = function (profileId, noteId) {
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

 ProfileNotesSrv.prototype.createProfileNote = function (profileNoteData) {
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

 ProfileNotesSrv.prototype.editProfileNote = function (profileNoteData) {
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


 return ProfileNotesSrv;
};

profileNotesSrv.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileNotesSrv', profileNotesSrv);