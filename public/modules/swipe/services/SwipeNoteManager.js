var swipeNoteManager = function ($http, $q) {

 var SwipeNoteManager = function () {
  this.swipeNotes = [];
 };
 SwipeNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SwipeNoteManager.prototype.getSwipeNote = function (swipeId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/swipe/' + swipeId + '/note/' + noteId).success(function (data) {
   self.swipeNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SwipeNoteManager.prototype.editSwipeNote = function (swipeNoteData) {
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

 return SwipeNoteManager;
};

swipeNoteManager.$inject = ['$http', '$q'];

angular.module('app.swipe').service('SwipeNoteManager', swipeNoteManager);