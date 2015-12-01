angular.module('app.skills').service('SkillTimelinesManager',
        ['$http', '$q', function ($http, $q) {

          var SkillTimelinesManager = function () {
           this.skillTimelines = [];
          };
          SkillTimelinesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          SkillTimelinesManager.prototype.getSkillTimelines = function (skillId) {
           var self = this;
           var deferred = $q.defer();
           self.skillTimelines = [];
           $http.get('/api/skill/' + skillId + '/timelines').success(function (data) {
            self.skillTimelines = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTimelinesManager.prototype.getSkillTimeline = function (skillId, timelineId) {
           var self = this;
           var deferred = $q.defer();
           self.skillTimelines = [];
           $http.get('/api/skill/' + skillId + '/timeline/' + timelineId).success(function (data) {
            self.skillTimelines = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTimelinesManager.prototype.createSkillTimeline = function (skillTimelineData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/skill/timeline/create',
            data: skillTimelineData
           }).success(function (data) {
            self.skillTimelines.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTimelinesManager.prototype.editSkillTimeline = function (skillTimelineData) {
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


          return SkillTimelinesManager;
         }
        ]);