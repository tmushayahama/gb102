var skillNotesSrv = function ($http, $q) {

 var SkillNotesSrv = function () {
  this.skillNotes = [];
 };
 SkillNotesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SkillNotesSrv.prototype.getSkillNotes = function (skillId) {
  var self = this;
  var deferred = $q.defer();
  self.skillNotes = [];
  $http.get('/api/skill/' + skillId + '/notes').success(function (data) {
   self.skillNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillNotesSrv.prototype.getSkillNote = function (skillId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.skillNotes = [];
  $http.get('/api/skill/' + skillId + '/note/' + noteId).success(function (data) {
   self.skillNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillNotesSrv.prototype.createSkillNote = function (skillNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/note/create',
   data: skillNoteData
  }).success(function (data) {
   self.skillNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillNotesSrv.prototype.editSkillNote = function (skillNoteData) {
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


 return SkillNotesSrv;
};

skillNotesSrv.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillNotesSrv', skillNotesSrv);