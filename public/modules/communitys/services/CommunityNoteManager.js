var communityNoteManager = function ($http, $q) {

 var CommunityNoteManager = function () {
  this.communityNotes = [];
 };
 CommunityNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 CommunityNoteManager.prototype.getCommunityNote = function (communityId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/community/' + communityId + '/note/' + noteId).success(function (data) {
   self.communityNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 CommunityNoteManager.prototype.editCommunityNote = function (communityNoteData) {
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

 return CommunityNoteManager;
};

communityNoteManager.$inject = ['$http', '$q'];

angular.module('app.communitys').service('CommunityNoteManager', communityNoteManager);