angular.module('app.skills').service('SkillTodoChecklistManager',
        ['$http', '$q', function ($http, $q) {

          var SkillTodoChecklistManager = function () {
           this.skillTodoChecklist = [];
          };
          SkillTodoChecklistManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          SkillTodoChecklistManager.prototype.getSkillTodoChecklist = function (todoId) {
           var self = this;
           var deferred = $q.defer();
           self.skillTodoChecklist = [];
           $http.get('/api/todo/' + todoId + '/checklist').success(function (data) {
            self.skillTodoChecklist = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTodoChecklistManager.prototype.getSkillTodoChecklistItem = function (skillId, todoId) {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/skill/' + skillId + '/todo/' + todoId).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTodoChecklistManager.prototype.createSkillTodoChecklistItem = function (skillTodoChecklistData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/todo/checklist/create',
            data: skillTodoChecklistData
           }).success(function (data) {
            self.skillTodoChecklist.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTodoChecklistManager.prototype.editSkillTodoChecklistItem = function (skillTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/todo/checklist/edit',
            data: skillTodoData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return SkillTodoChecklistManager;
         }
        ]);