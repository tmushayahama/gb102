angular.module('app.goals').service('GoalTimelineManager',
        ['$http', '$q', function ($http, $q) {

          var GoalTimelineManager = function () {
           this.goalTimelines = [];
          };
          GoalTimelineManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


          GoalTimelineManager.prototype.getGoalTimeline = function (goalId, timelineId) {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/goal/' + goalId + '/timeline/' + timelineId).success(function (data) {
            self.goalTimeline = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          GoalTimelineManager.prototype.editGoalTimeline = function (goalTimelineData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/goal/timeline/edit',
            data: goalTimelineData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          return GoalTimelineManager;
         }
        ]);