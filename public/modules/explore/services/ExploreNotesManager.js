var exploreNotesManager = function ($http, $q) {

 var ExploreNotesManager = function () {
  this.exploreNotes = [];
 };
 ExploreNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExploreNotesManager.prototype.getExploreNotes = function (exploreId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreNotes = [];
  $http.get('/api/explore/' + exploreId + '/notes').success(function (data) {
   self.exploreNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreNotesManager.prototype.getExploreNote = function (exploreId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.exploreNotes = [];
  $http.get('/api/explore/' + exploreId + '/note/' + noteId).success(function (data) {
   self.exploreNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreNotesManager.prototype.createExploreNote = function (exploreNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explore/note/create',
   data: exploreNoteData
  }).success(function (data) {
   self.exploreNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExploreNotesManager.prototype.editExploreNote = function (exploreNoteData) {
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


 return ExploreNotesManager;
};

exploreNotesManager.$inject = ['$http', '$q'];

angular.module('app.explore').service('ExploreNotesManager', exploreNotesManager);