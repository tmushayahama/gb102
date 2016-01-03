var journalTimelineManager = function ($http, $q) {

 var JournalTimelineManager = function () {
  this.journalTimelines = [];
 };
 JournalTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 JournalTimelineManager.prototype.getJournalTimeline = function (journalId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/journal/' + journalId + '/timeline/' + timelineId).success(function (data) {
   self.journalTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 JournalTimelineManager.prototype.editJournalTimeline = function (journalTimelineData) {
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

 return JournalTimelineManager;
};

journalTimelineManager.$inject = ['$http', '$q'];

angular.module('app.journals').service('JournalTimelineManager', journalTimelineManager);