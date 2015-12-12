angular.module('app.hobbys').service('HobbyWeblinksManager',
        ['$http', '$q', function ($http, $q) {

          var HobbyWeblinksManager = function () {
           this.hobbyWeblinks = [];
          };
          HobbyWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          HobbyWeblinksManager.prototype.getHobbyWeblinks = function (hobbyId) {
           var self = this;
           var deferred = $q.defer();
           self.hobbyWeblinks = [];
           $http.get('/api/hobby/' + hobbyId + '/weblinks').success(function (data) {
            self.hobbyWeblinks = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyWeblinksManager.prototype.getHobbyWeblink = function (hobbyId, weblinkId) {
           var self = this;
           var deferred = $q.defer();
           self.hobbyWeblinks = [];
           $http.get('/api/hobby/' + hobbyId + '/weblink/' + weblinkId).success(function (data) {
            self.hobbyWeblinks = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyWeblinksManager.prototype.createHobbyWeblink = function (hobbyWeblinkData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/hobby/weblink/create',
            data: hobbyWeblinkData
           }).success(function (data) {
            self.hobbyWeblinks.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbyWeblinksManager.prototype.editHobbyWeblink = function (hobbyWeblinkData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/hobby/weblink/edit',
            data: hobbyWeblinkData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return HobbyWeblinksManager;
         }
        ]);