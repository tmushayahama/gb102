angular.module('app.skills').service('SkillTodoManager',
        ['$http', '$q', function ($http, $q) {

          var SkillTodoManager = function () {
           this.skillTodos = [];
          };
          SkillTodoManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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
          SkillTodoManager.prototype.getSkillTodos = function (skillId) {
           var self = this;
           var deferred = $q.defer();
           self.skillTodos = [];
           $http.get('/api/skill/' + skillId + '/todos').success(function (data) {
            self.skillTodos = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };
          SkillTodoManager.prototype.getSkillTodo = function (skillId, todoId) {
           var self = this;
           var deferred = $q.defer();
           self.skillTodos = [];
           $http.get('/api/skill/' + skillId + '/todo/' + todoId).success(function (data) {
            self.skillTodos = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };
          SkillTodoManager.prototype.createSkillTodo = function (skillTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/skill/todo/create',
            data: skillTodoData
           }).success(function (data) {
            self.skillTodos.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };
          SkillTodoManager.prototype.editSkillTodo = function (skillTodoData) {
           var self = this;
           var deferred = $q.defer();
           self.skillTodos = [];
           $http({
            method: 'POST',
            url: '/api/skill/todo/edit',
            data: skillTodoData
           }).success(function (data) {
            self.skillTodos.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };
          SkillTodoManager.prototype.editSkillTodoSections = {
           title: function (skillTodoId, title) {
            var self = this;
            var skillTodoData = {
             skillTodoId: skillTodoId,
             title: title
            };
            self.editSkillTodo(skillTodoData);
           }
          }
          return SkillTodoManager;
          /*
           return {
           createSkillTodo: function (skillTodoData) {
           return $http({
           method: 'POST',
           url: '/api/skill/todo/create',
           data: skillTodoData
           });
           },
           getSkillTodos: function (skillId) {
           return $http.get('/api/skill/' + skillId + '/todos');
           },
           getSkillTodo: function (skillId, todoId) {
           return $http.get('/api/skill/' + skillId + '/todo/' + todoId);
           },
           editSkillTodoSections: {
           title: function (skillTodoId, title) {
           var skillTodoData = {
           skillTodoId: skillTodoId,
           title: title
           };
           editSkillTodo(skillTodoData);
           }
           },
           editSkillTodo: function (skillTodoData) {
           var deferred = $q.defer();
           return $http({
           method: 'POST',
           url: '/api/skill/todo/edit',
           data: skillTodoData
           }).success(function (data) {
           deferred.resolve(data);
           }).error(function (error) {
           deferred.reject(error);
           });
           return deferred.promise;
           },
           /*
           get: function () {
           return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
           },
           put: function (todos) {
           localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
           }
           };*/
         }
        ]);