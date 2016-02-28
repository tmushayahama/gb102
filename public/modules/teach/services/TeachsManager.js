var teachsSrv = function ($http, $q) {

 var TeachsSrv = function () {
  this.teachs = [];
 };
 TeachsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 TeachsSrv.prototype.getAllTeachs = function () {
  var self = this;
  var deferred = $q.defer();
  //self.teachs = [];
  $http.get('/api/teachs/all').success(function (data) {
   //self.teachs = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsSrv.prototype.getAppTeachs = function (appName) {
  var self = this;
  var deferred = $q.defer();
  // self.teachs = [];
  $http.get('/api/teachs/all/' + appName).success(function (data) {
   //self.teachs = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsSrv.prototype.getMyTeachs = function () {
  var self = this;
  var deferred = $q.defer();
  //self.teachs = [];
  $http.get('/api/teachs/mine').success(function (data) {
   //self.teachs = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsSrv.prototype.getTeach = function (teachId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.teach = [];
  $http.get('/api/teach/' + teachId + '//' + Id).success(function (data) {
   self.teach = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsSrv.prototype.createTeach = function (teachData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teach/create',
   data: teachData
  }).success(function (data) {
   self.teachs.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 TeachsSrv.prototype.editTeach = function (teachData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/teachedit',
   data: teachData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return TeachsSrv;
};

teachsSrv.$inject = ['$http', '$q'];

angular.module('app.teach').service('TeachsSrv', teachsSrv);

