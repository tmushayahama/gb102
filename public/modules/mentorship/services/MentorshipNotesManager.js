var mentorshipNotesManager = function ($http, $q) {

 var MentorshipNotesManager = function () {
  this.mentorshipNotes = [];
 };
 MentorshipNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipNotesManager.prototype.getMentorshipNotes = function (mentorshipId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipNotes = [];
  $http.get('/api/mentorship/' + mentorshipId + '/notes').success(function (data) {
   self.mentorshipNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipNotesManager.prototype.getMentorshipNote = function (mentorshipId, noteId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipNotes = [];
  $http.get('/api/mentorship/' + mentorshipId + '/note/' + noteId).success(function (data) {
   self.mentorshipNotes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipNotesManager.prototype.createMentorshipNote = function (mentorshipNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/note/create',
   data: mentorshipNoteData
  }).success(function (data) {
   self.mentorshipNotes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipNotesManager.prototype.editMentorshipNote = function (mentorshipNoteData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/note/edit',
   data: mentorshipNoteData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return MentorshipNotesManager;
};

mentorshipNotesManager.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipNotesManager', mentorshipNotesManager);