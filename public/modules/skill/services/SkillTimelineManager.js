var skillTimelineManager = function ($http, $q) {

 var SkillTimelineManager = function () {
  this.skillTimelines = [];
 };
 SkillTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SkillTimelineManager.prototype.getSkillTimeline = function (skillId, timelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/skill/' + skillId + '/timeline/' + timelineId).success(function (data) {
   self.skillTimeline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SkillTimelineManager.prototype.editSkillTimeline = function (skillTimelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/timeline/edit',
   data: skillTimelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return SkillTimelineManager;
};

skillTimelineManager.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillTimelineManager', skillTimelineManager);