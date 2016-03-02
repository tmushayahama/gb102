var mentorshipCommentSrv = function ($http, $q) {

 var MentorshipCommentSrv = function () {
  this.mentorshipComments = [];
 };
 MentorshipCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 MentorshipCommentSrv.prototype.getMentorshipComment = function (mentorshipId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/mentorship/' + mentorshipId + '/comment/' + commentId).success(function (data) {
   self.mentorshipComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 MentorshipCommentSrv.prototype.editMentorshipComment = function (mentorshipCommentData) {
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

 return MentorshipCommentSrv;
};

mentorshipCommentSrv.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipCommentSrv', mentorshipCommentSrv);
