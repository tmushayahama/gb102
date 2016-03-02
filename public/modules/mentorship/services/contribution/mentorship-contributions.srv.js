var mentorshipContributionsSrv = function ($http, $q) {

 var MentorshipContributionsSrv = function () {
  this.mentorshipContributions = [];
 };
 MentorshipContributionsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipContributionsSrv.prototype.getMentorshipContributions = function (mentorshipId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipContributions = [];
  $http.get('/api/mentorship/' + mentorshipId + '/contributions').success(function (data) {
   self.mentorshipContributions = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipContributionsSrv.prototype.getMentorshipContribution = function (mentorshipId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipContributions = [];
  $http.get('/api/mentorship/' + mentorshipId + '/contribution/' + contributionId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipContributionsSrv.prototype.getMentorshipContributionLevel = function (mentorshipId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipContributions = [];
  $http.get('/api/mentorship/' + mentorshipId + '/contribution/' + contributionId + "/level").success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipContributionsSrv.prototype.createMentorshipContribution = function (mentorshipContributionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/contribution/create',
   data: mentorshipContributionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipContributionsSrv.prototype.editMentorshipContribution = function (mentorshipContributionData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/contribution/edit',
   data: mentorshipContributionData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return MentorshipContributionsSrv;
};

mentorshipContributionsSrv.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipContributionsSrv', mentorshipContributionsSrv);
