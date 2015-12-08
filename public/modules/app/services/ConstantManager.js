angular.module('app.skills').service('ConstantManager',
        ['$http', '$q', function ($http, $q) {

          var ConstantManager = function () {
           // this.skills = [];
          };
          ConstantManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          ConstantManager.prototype.getLevel = function (code) {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/constant/level/' + code).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          return ConstantManager;
         }
        ]);