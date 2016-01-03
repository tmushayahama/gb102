var journalTimelinesManager = function ($http, $q) {

 var JournalTimelinesManager = function () {
  this.journalTimelines = [];
 };
 JournalTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalTimelinesManager.prototype.getJournalTimelines = function (journalId) {
  var self = this;
  var deferred = $q.defer();
  self.journalTimelines = [];
  $http.get('/api/journal/' + journalId + '/timelines').success(function (data) {
   self.journalTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTimelinesManager.prototype.getJournalTimeline = function (journalId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.journalTimelines = [];
  $http.get('/api/journal/' + journalId + '/timeline/' + timelineId).success(function (data) {
   self.journalTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTimelinesManager.prototype.createJournalTimeline = function (journalTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/timeline/create',
   data: journalTimelineData
  }).success(function (data) {
   self.journalTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalTimelinesManager.prototype.editJournalTimeline = function (journalTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/timeline/edit',
   data: journalTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return JournalTimelinesManager;
};

journalTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.journals').service('JournalTimelinesManager', journalTimelinesManager);
