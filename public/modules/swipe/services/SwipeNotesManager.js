var swipeNotesManager = function ($http, $q) {

 var SwipeNotesManager = function () {
  this.swipeNotes = [];
 };
 SwipeNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SwipeNotesManager.prototype.getSwipeNotes = function (swipeId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeNotes = [];
  $http.get('/api/swipe/' + swipeId + '/notes').success(function (data) {
   self.swipeNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeNotesManager.prototype.getSwipeNote = function (swipeId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.swipeNotes = [];
  $http.get('/api/swipe/' + swipeId + '/note/' + noteId).success(function (data) {
   self.swipeNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeNotesManager.prototype.createSwipeNote = function (swipeNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/note/create',
   data: swipeNoteData
  }).success(function (data) {
   self.swipeNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SwipeNotesManager.prototype.editSwipeNote = function (swipeNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/swipe/note/edit',
   data: swipeNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SwipeNotesManager;
};

swipeNotesManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeNotesManager', swipeNotesManager);