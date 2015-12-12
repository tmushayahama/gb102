angular.module('app.hobbys').service('HobbyTodosManager',
        ['$http', '$q', function ($http, $q) {

          var HobbyTodosManager = function () {
           this.hobbyTodos = [];
          };
          HobbyTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          HobbyTodosManager.prototype.getHobbyTodos = function (hobbyId) {
           var self = this;
           var deferred = $q.defer();
           self.hobbyTodos = [];
           $http.get('/api/hobby/' + hobbyId + '/todos').success(function (data) {
            self.hobbyTodos = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyTodosManager.prototype.getHobbyTodo = function (hobbyId, todoId) {
           var self = this;
           var deferred = $q.defer();
           self.hobbyTodos = [];
           $http.get('/api/hobby/' + hobbyId + '/todo/' + todoId).success(function (data) {
            self.hobbyTodos = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyTodosManager.prototype.createHobbyTodo = function (hobbyTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/hobby/todo/create',
            data: hobbyTodoData
           }).success(function (data) {
            self.hobbyTodos.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyTodosManager.prototype.editHobbyTodo = function (hobbyTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/hobby/todo/edit',
            data: hobbyTodoData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return HobbyTodosManager;
         }
        ]);