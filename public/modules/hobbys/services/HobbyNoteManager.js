var hobbyNoteManager = function ($http, $q) {

 var HobbyNoteManager = function () {
  this.hobbyNotes = [];
 };
 HobbyNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 HobbyNoteManager.prototype.getHobbyNote = function (hobbyId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/hobby/' + hobbyId + '/note/' + noteId).success(function (data) {
   self.hobbyNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 HobbyNoteManager.prototype.editHobbyNote = function (hobbyNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobby/note/edit',
   data: hobbyNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return HobbyNoteManager;
};

hobbyNoteManager.$inject = ['$http', '$q'];

angular.module('app.hobbys').service('HobbyNoteManager', hobbyNoteManager);