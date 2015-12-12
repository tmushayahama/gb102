angular.module('app.promises').service('PromiseTodosManager',
        ['$http', '$q', function ($http, $q) {

          var PromiseTodosManager = function () {
           this.promiseTodos = [];
          };
          PromiseTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          PromiseTodosManager.prototype.getPromiseTodos = function (promiseId) {
           var self = this;
           var deferred = $q.defer();
           self.promiseTodos = [];
           $http.get('/api/promise/' + promiseId + '/todos').success(function (data) {
            self.promiseTodos = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          PromiseTodosManager.prototype.getPromiseTodo = function (promiseId, todoId) {
           var self = this;
           var deferred = $q.defer();
           self.promiseTodos = [];
           $http.get('/api/promise/' + promiseId + '/todo/' + todoId).success(function (data) {
            self.promiseTodos = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          PromiseTodosManager.prototype.createPromiseTodo = function (promiseTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/promise/todo/create',
            data: promiseTodoData
           }).success(function (data) {
            self.promiseTodos.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          PromiseTodosManager.prototype.editPromiseTodo = function (promiseTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/promise/todo/edit',
            data: promiseTodoData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return PromiseTodosManager;
         }
        ]);