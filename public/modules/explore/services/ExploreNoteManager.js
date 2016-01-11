var exploreNoteManager = function ($http, $q) {

 var ExploreNoteManager = function () {
  this.exploreNotes = [];
 };
 ExploreNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExploreNoteManager.prototype.getExploreNote = function (exploreId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explore/' + exploreId + '/note/' + noteId).success(function (data) {
   self.exploreNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExploreNoteManager.prototype.editExploreNote = function (exploreNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/note/edit',
   data: exploreNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExploreNoteManager;
};

exploreNoteManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreNoteManager', exploreNoteManager);