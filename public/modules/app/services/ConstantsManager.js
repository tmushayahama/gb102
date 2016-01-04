angular.module('app').service('ConstantsManager',
        ['$http', '$q', function ($http, $q) {

          var ConstantsManager = function () {
           // this.skills = [];
          };
          ConstantsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          ConstantsManager.prototype.getAppTypes = function () {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/constants/apptypes').success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          ConstantsManager.prototype.getIcons = function (type) {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/constants/icons/' + type).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          ConstantsManager.prototype.getLevel = function (category) {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/constants/level/' + category).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };
          return ConstantsManager;
         }
        ]);