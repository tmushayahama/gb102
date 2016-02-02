var adviceNoteManager = function ($http, $q) {

 var AdviceNoteManager = function () {
  this.adviceNotes = [];
 };
 AdviceNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 AdviceNoteManager.prototype.getAdviceNote = function (adviceId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/advice/' + adviceId + '/note/' + noteId).success(function (data) {
   self.adviceNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 AdviceNoteManager.prototype.editAdviceNote = function (adviceNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/advice/note/edit',
   data: adviceNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return AdviceNoteManager;
};

adviceNoteManager.$inject = ['$http', '$q'];

angular.module('app.advice').service('AdviceNoteManager', adviceNoteManager);