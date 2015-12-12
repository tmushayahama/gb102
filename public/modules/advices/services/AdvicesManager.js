angular.module('app.advices').service('AdvicesManager',
        ['$http', '$q', function ($http, $q) {

          var AdvicesManager = function () {
           this.advices = [];
          };
          AdvicesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          AdvicesManager.prototype.getAdvices = function (adviceId) {
           var self = this;
           var deferred = $q.defer();
           self.advices = [];
           $http.get('/api/advices').success(function (data) {
            self.advices = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          AdvicesManager.prototype.getAdvice = function (adviceId, Id) {
           var self = this;
           var deferred = $q.defer();
           self.advice = [];
           $http.get('/api/advice/' + adviceId + '//' + Id).success(function (data) {
            self.advice = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          AdvicesManager.prototype.createAdvice = function (adviceData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/advice/create',
            data: adviceData
           }).success(function (data) {
            self.advices.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          AdvicesManager.prototype.editAdvice = function (adviceData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/adviceedit',
            data: adviceData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return AdvicesManager;
         }
        ]);