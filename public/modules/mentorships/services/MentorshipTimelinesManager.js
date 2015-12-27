var mentorshipTimelinesManager = function ($http, $q) {

 var MentorshipTimelinesManager = function () {
  this.mentorshipTimelines = [];
 };
 MentorshipTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 MentorshipTimelinesManager.prototype.getMentorshipTimelines = function (mentorshipId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipTimelines = [];
  $http.get('/api/mentorship/' + mentorshipId + '/timelines').success(function (data) {
   self.mentorshipTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipTimelinesManager.prototype.getMentorshipTimeline = function (mentorshipId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.mentorshipTimelines = [];
  $http.get('/api/mentorship/' + mentorshipId + '/timeline/' + timelineId).success(function (data) {
   self.mentorshipTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipTimelinesManager.prototype.createMentorshipTimeline = function (mentorshipTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/timeline/create',
   data: mentorshipTimelineData
  }).success(function (data) {
   self.mentorshipTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 MentorshipTimelinesManager.prototype.editMentorshipTimeline = function (mentorshipTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/mentorship/timeline/edit',
   data: mentorshipTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return MentorshipTimelinesManager;
};

mentorshipTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.mentorships').service('MentorshipTimelinesManager', mentorshipTimelinesManager);
