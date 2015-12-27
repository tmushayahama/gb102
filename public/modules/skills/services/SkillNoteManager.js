var skillNoteManager = function ($http, $q) {

 var SkillNoteManager = function () {
  this.skillNotes = [];
 };
 SkillNoteManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SkillNoteManager.prototype.getSkillNote = function (skillId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/skill/' + skillId + '/note/' + noteId).success(function (data) {
   self.skillNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SkillNoteManager.prototype.editSkillNote = function (skillNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/note/edit',
   data: skillNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return SkillNoteManager;
};

skillNoteManager.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillNoteManager', skillNoteManager);