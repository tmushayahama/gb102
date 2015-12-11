angular.module('app.goals').service('GoalNotesManager',
        ['$http', '$q', function ($http, $q) {

          var GoalNotesManager = function () {
           this.goalNotes = [];
          };
          GoalNotesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          GoalNotesManager.prototype.getGoalNotes = function (goalId) {
           var self = this;
           var deferred = $q.defer();
           self.goalNotes = [];
           $http.get('/api/goal/' + goalId + '/notes').success(function (data) {
            self.goalNotes = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          GoalNotesManager.prototype.getGoalNote = function (goalId, noteId) {
           var self = this;
           var deferred = $q.defer();
           self.goalNotes = [];
           $http.get('/api/goal/' + goalId + '/note/' + noteId).success(function (data) {
            self.goalNotes = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          GoalNotesManager.prototype.createGoalNote = function (goalNoteData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/goal/note/create',
            data: goalNoteData
           }).success(function (data) {
            self.goalNotes.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          GoalNotesManager.prototype.editGoalNote = function (goalNoteData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/goal/note/edit',
            data: goalNoteData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return GoalNotesManager;
         }
        ]);