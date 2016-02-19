var mentorshipProgressManager = function ($http, $q) {

 var MentorshipProgressManager = function () {
  this.mentorshipProgress = [];
 };
 MentorshipProgressManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipProgressManager.prototype.getMentorshipProgress = function (mentorshipId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipProgress = [];
  $http.get('/api/mentorship/' + mentorshipId + '/progress').success(function (data) {
   self.mentorshipProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipProgressManager.prototype.getMentorshipProgress = function (mentorshipId, progressId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipProgress = [];
  $http.get('/api/mentorship/' + mentorshipId + '/progress/' + progressId).success(function (data) {
   self.mentorshipProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipProgressManager.prototype.createMentorshipProgress = function (mentorshipProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/progress/create',
   data: mentorshipProgressData
  }).success(function (data) {
   self.mentorshipProgress.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipProgressManager.prototype.editMentorshipProgress = function (mentorshipProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/progress/edit',
   data: mentorshipProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return MentorshipProgressManager;
};

mentorshipProgressManager.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipProgressManager', mentorshipProgressManager);
