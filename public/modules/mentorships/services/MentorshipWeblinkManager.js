var mentorshipWeblinkManager = function ($http, $q) {

 var MentorshipWeblinkManager = function () {
  this.mentorshipWeblinks = [];
 };
 MentorshipWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 MentorshipWeblinkManager.prototype.getMentorshipWeblink = function (mentorshipId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/mentorship/' + mentorshipId + '/weblink/' + weblinkId).success(function (data) {
   self.mentorshipWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 MentorshipWeblinkManager.prototype.editMentorshipWeblink = function (mentorshipWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/weblink/edit',
   data: mentorshipWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return MentorshipWeblinkManager;
};

mentorshipWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.mentorships').service('MentorshipWeblinkManager', mentorshipWeblinkManager);