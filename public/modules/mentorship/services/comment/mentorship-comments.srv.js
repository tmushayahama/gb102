var mentorshipCommentsSrv = function ($http, $q) {

 var MentorshipCommentsSrv = function () {
  this.mentorshipComments = [];
 };
 MentorshipCommentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipCommentsSrv.prototype.getMentorshipComments = function (mentorshipId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipComments = [];
  $http.get('/api/mentorship/' + mentorshipId + '/comments').success(function (data) {
   self.mentorshipComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipCommentsSrv.prototype.getMentorshipComment = function (mentorshipId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipComments = [];
  $http.get('/api/mentorship/' + mentorshipId + '/comment/' + commentId).success(function (data) {
   self.mentorshipComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipCommentsSrv.prototype.createMentorshipComment = function (mentorshipCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/comment/create',
   data: mentorshipCommentData
  }).success(function (data) {
   self.mentorshipComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipCommentsSrv.prototype.editMentorshipComment = function (mentorshipCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/comment/edit',
   data: mentorshipCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return MentorshipCommentsSrv;
};

mentorshipCommentsSrv.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipCommentsSrv', mentorshipCommentsSrv);
