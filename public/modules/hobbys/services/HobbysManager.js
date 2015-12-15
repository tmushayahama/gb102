angular.module('app.hobbys').service('HobbysManager',
        ['$http', '$q', function ($http, $q) {

          var HobbysManager = function () {
           this.hobbys = [];
          };
          HobbysManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

          HobbysManager.prototype.getAllHobbys = function () {
           var self = this;
           var deferred = $q.defer();
           self.hobbys = [];
           $http.get('/api/hobbys/all').success(function (data) {
            self.hobbys = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbysManager.prototype.getMyHobbys = function () {
           var self = this;
           var deferred = $q.defer();
           self.hobbys = [];
           $http.get('/api/hobbys/mine').success(function (data) {
            self.hobbys = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbysManager.prototype.getHobby = function (hobbyId, Id) {
           var self = this;
           var deferred = $q.defer();
           self.hobby = [];
           $http.get('/api/hobby/' + hobbyId + '//' + Id).success(function (data) {
            self.hobby = data;
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbysManager.prototype.createHobby = function (hobbyData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/hobby/create',
            data: hobbyData
           }).success(function (data) {
            self.hobbys.unshift(data);
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };

          HobbysManager.prototype.editHobby = function (hobbyData) {
           var self = this;
           var deferred = $q.defer();
           $http({
            method: 'POST',
            url: '/api/hobbyedit',
            data: hobbyData
           }).success(function (data) {
            self.deferredHandler(data, deferred);
           }).error(function (data) {
            self.deferredHandler(data, deferred, 'Unknown error');
           });
           return deferred.promise;
          };


          return HobbysManager;
         }
        ]);