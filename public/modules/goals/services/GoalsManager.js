angular.module('app.goals').service('GoalsManager',
        ['$http', '$q', function ($http, $q) {

          var GoalsManager = function () {
           this.goals = [];
          };
          GoalsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          GoalsManager.prototype.getAllGoals = function () {
           var self = this;
           var deferred = $q.defer();
           self.goals = [];
           $http.get('/api/goals/all').success(function (data) {
            self.goals = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          GoalsManager.prototype.getMyGoals = function () {
           var self = this;
           var deferred = $q.defer();
           self.goals = [];
           $http.get('/api/goals/mine').success(function (data) {
            self.goals = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          GoalsManager.prototype.getGoal = function (goalId, Id) {
           var self = this;
           var deferred = $q.defer();
           self.goal = [];
           $http.get('/api/goal/' + goalId + '//' + Id).success(function (data) {
            self.goal = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          GoalsManager.prototype.createGoal = function (goalData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/goal/create',
            data: goalData
           }).success(function (data) {
            self.goals.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          GoalsManager.prototype.editGoal = function (goalData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/goaledit',
            data: goalData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return GoalsManager;
         }
        ]);