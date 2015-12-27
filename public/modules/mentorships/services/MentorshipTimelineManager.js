var mentorshipTimelineManager = function ($http, $q) {

 var MentorshipTimelineManager = function () {
  this.mentorshipTimelines = [];
 };
 MentorshipTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 MentorshipTimelineManager.prototype.getMentorshipTimeline = function (mentorshipId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/mentorship/' + mentorshipId + '/timeline/' + timelineId).success(function (data) {
   self.mentorshipTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 MentorshipTimelineManager.prototype.editMentorshipTimeline = function (mentorshipTimelineData) {
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

 return MentorshipTimelineManager;
};

mentorshipTimelineManager.$inject = ['$http', '$q'];

angular.module('app.mentorships').service('MentorshipTimelineManager', mentorshipTimelineManager);