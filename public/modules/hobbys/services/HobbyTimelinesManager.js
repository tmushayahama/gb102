var hobbyTimelinesManager = function ($http, $q) {

 var HobbyTimelinesManager = function () {
  this.hobbyTimelines = [];
 };
 HobbyTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 HobbyTimelinesManager.prototype.getHobbyTimelines = function (hobbyId) {
  var self = this;
  var deferred = $q.defer();
  self.hobbyTimelines = [];
  $http.get('/api/hobby/' + hobbyId + '/timelines').success(function (data) {
   self.hobbyTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyTimelinesManager.prototype.getHobbyTimeline = function (hobbyId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.hobbyTimelines = [];
  $http.get('/api/hobby/' + hobbyId + '/timeline/' + timelineId).success(function (data) {
   self.hobbyTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyTimelinesManager.prototype.createHobbyTimeline = function (hobbyTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobby/timeline/create',
   data: hobbyTimelineData
  }).success(function (data) {
   self.hobbyTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 HobbyTimelinesManager.prototype.editHobbyTimeline = function (hobbyTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/hobby/timeline/edit',
   data: hobbyTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return HobbyTimelinesManager;
};

hobbyTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.hobbys').service('HobbyTimelinesManager', hobbyTimelinesManager);
