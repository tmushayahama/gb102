angular.module('app.promises').service('PromiseWeblinkManager',
        ['$http', '$q', function ($http, $q) {

          var PromiseWeblinkManager = function () {
           this.promiseWeblinks = [];
          };
          PromiseWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


          PromiseWeblinkManager.prototype.getPromiseWeblink = function (promiseId, weblinkId) {
           var self = this;
           var deferred = $q.defer();
           $http.get('/api/promise/' + promiseId + '/weblink/' + weblinkId).success(function (data) {
            self.promiseWeblink = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          PromiseWeblinkManager.prototype.editPromiseWeblink = function (promiseWeblinkData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/promise/weblink/edit',
            data: promiseWeblinkData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          return PromiseWeblinkManager;
         }
        ]);