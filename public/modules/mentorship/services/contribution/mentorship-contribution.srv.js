var mentorshipContributionSrv = function ($http, $q) {

 var MentorshipContributionSrv = function () {
  this.mentorshipContributions = [];
 };
 MentorshipContributionSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 MentorshipContributionSrv.prototype.getMentorshipContribution = function (mentorshipId, contributionId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/mentorship/' + mentorshipId + '/contribution/' + contributionId).success(function (data) {
   self.mentorshipContribution = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 MentorshipContributionSrv.prototype.editMentorshipContribution = function (mentorshipContributionData) {
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

 return MentorshipContributionSrv;
};

mentorshipContributionSrv.$inject = ['$http', '$q'];

angular.module('app.mentorship').service('MentorshipContributionSrv', mentorshipContributionSrv);
