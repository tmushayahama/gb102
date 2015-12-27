var promiseNotesManager = function ($http, $q) {

 var PromiseNotesManager = function () {
  this.promiseNotes = [];
 };
 PromiseNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 PromiseNotesManager.prototype.getPromiseNotes = function (promiseId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseNotes = [];
  $http.get('/api/promise/' + promiseId + '/notes').success(function (data) {
   self.promiseNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseNotesManager.prototype.getPromiseNote = function (promiseId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.promiseNotes = [];
  $http.get('/api/promise/' + promiseId + '/note/' + noteId).success(function (data) {
   self.promiseNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseNotesManager.prototype.createPromiseNote = function (promiseNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/note/create',
   data: promiseNoteData
  }).success(function (data) {
   self.promiseNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 PromiseNotesManager.prototype.editPromiseNote = function (promiseNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/promise/note/edit',
   data: promiseNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return PromiseNotesManager;
};

promiseNotesManager.$inject = ['$http', '$q'];

angular.module('app.promises').service('PromiseNotesManager', promiseNotesManager);