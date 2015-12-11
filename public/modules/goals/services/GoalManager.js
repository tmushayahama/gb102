angular.module('app.goals').service('GoalManager',
        ['$http', '$q', function ($http, $q) {

          var GoalManager = function () {
           this.goal = [];
          };
          GoalManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          GoalManager.prototype.getGoal = function (goalId) {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/goal/' + goalId).success(function (data) {
            self.goal = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          GoalManager.prototype.editGoal = function (goalData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/goal/edit',
            data: goalData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          return GoalManager;
         }
        ]);