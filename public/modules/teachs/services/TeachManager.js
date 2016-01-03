var teachManager = function ($http, $q) {

 var TeachManager = function () {
  this.teach = [];
 };
 TeachManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachManager.prototype.getTeach = function (teachId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/teach/' + teachId).success(function (data) {
   self.teach = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 TeachManager.prototype.editTeach = function (teachData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/edit',
   data: teachData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return TeachManager;
};

teachManager.$inject = ['$http', '$q'];

angular.module('app.teachs').service('TeachManager', teachManager);
