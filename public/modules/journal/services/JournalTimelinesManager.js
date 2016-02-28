var journalProgressSrv = function ($http, $q) {

 var JournalProgressSrv = function () {
  this.journalProgress = [];
 };
 JournalProgressSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalProgressSrv.prototype.getJournalProgress = function (journalId) {
  var self = this;
  var deferred = $q.defer();
  self.journalProgress = [];
  $http.get('/api/journal/' + journalId + '/progress').success(function (data) {
   self.journalProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalProgressSrv.prototype.getJournalProgress = function (journalId, progressId) {
  var self = this;
  var deferred = $q.defer();
  self.journalProgress = [];
  $http.get('/api/journal/' + journalId + '/progress/' + progressId).success(function (data) {
   self.journalProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalProgressSrv.prototype.createJournalProgress = function (journalProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/progress/create',
   data: journalProgressData
  }).success(function (data) {
   self.journalProgress.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalProgressSrv.prototype.editJournalProgress = function (journalProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/progress/edit',
   data: journalProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return JournalProgressSrv;
};

journalProgressSrv.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalProgressSrv', journalProgressSrv);
