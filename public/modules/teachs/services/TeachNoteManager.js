var teachNoteManager = function ($http, $q) {

 var TeachNoteManager = function () {
  this.teachNotes = [];
 };
 TeachNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 TeachNoteManager.prototype.getTeachNote = function (teachId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/teach/' + teachId + '/note/' + noteId).success(function (data) {
   self.teachNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 TeachNoteManager.prototype.editTeachNote = function (teachNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/note/edit',
   data: teachNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return TeachNoteManager;
};

teachNoteManager.$inject = ['$http', '$q'];

angular.module('app.teachs').service('TeachNoteManager', teachNoteManager);