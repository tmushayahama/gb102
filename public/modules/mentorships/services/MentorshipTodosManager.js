angular.module('app.mentorships').service('MentorshipTodosManager',
        ['$http', '$q', function ($http, $q) {

          var MentorshipTodosManager = function () {
           this.mentorshipTodos = [];
          };
          MentorshipTodosManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          MentorshipTodosManager.prototype.getMentorshipTodos = function (mentorshipId) {
           var self = this;
           var deferred = $q.defer();
           self.mentorshipTodos = [];
           $http.get('/api/mentorship/' + mentorshipId + '/todos').success(function (data) {
            self.mentorshipTodos = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipTodosManager.prototype.getMentorshipTodo = function (mentorshipId, todoId) {
           var self = this;
           var deferred = $q.defer();
           self.mentorshipTodos = [];
           $http.get('/api/mentorship/' + mentorshipId + '/todo/' + todoId).success(function (data) {
            self.mentorshipTodos = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipTodosManager.prototype.createMentorshipTodo = function (mentorshipTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/mentorship/todo/create',
            data: mentorshipTodoData
           }).success(function (data) {
            self.mentorshipTodos.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          MentorshipTodosManager.prototype.editMentorshipTodo = function (mentorshipTodoData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/mentorship/todo/edit',
            data: mentorshipTodoData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return MentorshipTodosManager;
         }
        ]);