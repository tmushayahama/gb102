angular.module('app.skills').service('SkillCommentsManager',
        ['$http', '$q', function ($http, $q) {

          var SkillCommentsManager = function () {
           this.skillComments = [];
          };
          SkillCommentsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          SkillCommentsManager.prototype.getSkillComments = function (skillId) {
           var self = this;
           var deferred = $q.defer();
           self.skillComments = [];
           $http.get('/api/skill/' + skillId + '/comments').success(function (data) {
            self.skillComments = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillCommentsManager.prototype.getSkillComment = function (skillId, commentId) {
           var self = this;
           var deferred = $q.defer();
           self.skillComments = [];
           $http.get('/api/skill/' + skillId + '/comment/' + commentId).success(function (data) {
            self.skillComments = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillCommentsManager.prototype.createSkillComment = function (skillCommentData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/skill/comment/create',
            data: skillCommentData
           }).success(function (data) {
            self.skillComments.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          SkillCommentsManager.prototype.editSkillComment = function (skillCommentData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/skill/comment/edit',
            data: skillCommentData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return SkillCommentsManager;
         }
        ]);