var profileTimelinesManager = function ($http, $q) {

 var ProfileTimelinesManager = function () {
  this.profileTimelines = [];
 };
 ProfileTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ProfileTimelinesManager.prototype.getProfileTimelines = function (profileId) {
  var self = this;
  var deferred = $q.defer();
  self.profileTimelines = [];
  $http.get('/api/profile/' + profileId + '/timelines').success(function (data) {
   self.profileTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTimelinesManager.prototype.getProfileTimeline = function (profileId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  self.profileTimelines = [];
  $http.get('/api/profile/' + profileId + '/timeline/' + timelineId).success(function (data) {
   self.profileTimelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTimelinesManager.prototype.createProfileTimeline = function (profileTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/timeline/create',
   data: profileTimelineData
  }).success(function (data) {
   self.profileTimelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ProfileTimelinesManager.prototype.editProfileTimeline = function (profileTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/profile/timeline/edit',
   data: profileTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ProfileTimelinesManager;
};

profileTimelinesManager.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileTimelinesManager', profileTimelinesManager);
