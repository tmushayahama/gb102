angular.module('app.promises').service('PromisesManager',
        ['$http', '$q', function ($http, $q) {

          var PromisesManager = function () {
           this.promises = [];
          };
          PromisesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          PromisesManager.prototype.getPromises = function (promiseId) {
           var self = this;
           var deferred = $q.defer();
           self.promises = [];
           $http.get('/api/promises').success(function (data) {
            self.promises = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          PromisesManager.prototype.getPromise = function (promiseId, Id) {
           var self = this;
           var deferred = $q.defer();
           self.promise = [];
           $http.get('/api/promise/' + promiseId + '//' + Id).success(function (data) {
            self.promise = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          PromisesManager.prototype.createPromise = function (promiseData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/promise/create',
            data: promiseData
           }).success(function (data) {
            self.promises.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          PromisesManager.prototype.editPromise = function (promiseData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/promiseedit',
            data: promiseData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return PromisesManager;
         }
        ]);