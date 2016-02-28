var profileNoteSrv = function ($http, $q) {

 var ProfileNoteSrv = function () {
  this.profileNotes = [];
 };
 ProfileNoteSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProfileNoteSrv.prototype.getProfileNote = function (profileId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + profileId + '/note/' + noteId).success(function (data) {
   self.profileNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProfileNoteSrv.prototype.editProfileNote = function (profileNoteData) {
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

 return ProfileNoteSrv;
};

profileNoteSrv.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileNoteSrv', profileNoteSrv);