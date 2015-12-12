angular.module('app.hobbys').service('HobbyCommentsManager',
        ['$http', '$q', function ($http, $q) {

          var HobbyCommentsManager = function () {
           this.hobbyComments = [];
          };
          HobbyCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          HobbyCommentsManager.prototype.getHobbyComments = function (hobbyId) {
           var self = this;
           var deferred = $q.defer();
           self.hobbyComments = [];
           $http.get('/api/hobby/' + hobbyId + '/comments').success(function (data) {
            self.hobbyComments = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyCommentsManager.prototype.getHobbyComment = function (hobbyId, commentId) {
           var self = this;
           var deferred = $q.defer();
           self.hobbyComments = [];
           $http.get('/api/hobby/' + hobbyId + '/comment/' + commentId).success(function (data) {
            self.hobbyComments = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyCommentsManager.prototype.createHobbyComment = function (hobbyCommentData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/hobby/comment/create',
            data: hobbyCommentData
           }).success(function (data) {
            self.hobbyComments.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyCommentsManager.prototype.editHobbyComment = function (hobbyCommentData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/hobby/comment/edit',
            data: hobbyCommentData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return HobbyCommentsManager;
         }
        ]);