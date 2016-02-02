var teachWeblinkManager = function ($http, $q) {

 var TeachWeblinkManager = function () {
  this.teachWeblinks = [];
 };
 TeachWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 TeachWeblinkManager.prototype.getTeachWeblink = function (teachId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/teach/' + teachId + '/weblink/' + weblinkId).success(function (data) {
   self.teachWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 TeachWeblinkManager.prototype.editTeachWeblink = function (teachWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/weblink/edit',
   data: teachWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return TeachWeblinkManager;
};

teachWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachWeblinkManager', teachWeblinkManager);