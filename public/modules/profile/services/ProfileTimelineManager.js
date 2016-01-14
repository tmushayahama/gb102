var profileTimelineManager = function ($http, $q) {

 var ProfileTimelineManager = function () {
  this.profileTimelines = [];
 };
 ProfileTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ProfileTimelineManager.prototype.getProfileTimeline = function (profileId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/profile/' + profileId + '/timeline/' + timelineId).success(function (data) {
   self.profileTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ProfileTimelineManager.prototype.editProfileTimeline = function (profileTimelineData) {
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

 return ProfileTimelineManager;
};

profileTimelineManager.$inject = ['$http', '$q'];

angular.module('app.profile').service('ProfileTimelineManager', profileTimelineManager);