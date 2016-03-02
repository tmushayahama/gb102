var mentorshipNoteSrv = function ($http, $q) {

 var MentorshipNoteSrv = function () {
  this.mentorshipNotes = [];
 };
 MentorshipNoteSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 MentorshipNoteSrv.prototype.getMentorshipNote = function (mentorshipId, noteId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/mentorship/' + mentorshipId + '/note/' + noteId).success(function (data) {
   self.mentorshipNote = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 MentorshipNoteSrv.prototype.editMentorshipNote = function (mentorshipNoteData) {
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

 return MentorshipNoteSrv;
};

mentorshipNoteSrv.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipNoteSrv', mentorshipNoteSrv);