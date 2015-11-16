angular.module('app.skills').service('SkillTodoChecklistManager',
        ['$http', '$q', function ($http, $q) {

          var SkillTodoChecklistManager = function () {
           this.skillTodoChecklists = [];
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

          SkillTodoChecklistManager.prototype.getSkillTodoChecklist = function (skillId) {
           var self = this;
           var deferred = $q.defer();
           self.skillTodoChecklists = [];
           $http.get('/api/skill/' + skillId + '/todos').success(function (data) {
            self.skillTodoChecklists = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTodoChecklistManager.prototype.getSkillTodo = function (skillId, todoId) {
           var self = this;
           var deferred = $q.defer();
           self.skillTodoChecklists = [];
           $http.get('/api/skill/' + skillId + '/todo/' + todoId).success(function (data) {
            self.skillTodoChecklists = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTodoChecklistManager.prototype.createSkillTodo = function (skillTodoChecklistData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/todo/checklist/create',
            data: skillTodoChecklistData
           }).success(function (data) {
            self.skillTodoChecklists.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillTodoChecklistManager.prototype.editSkillTodo = function (skillTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/skill/todo/edit',
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