var journalsManager = function ($http, $q) {

 var JournalsManager = function () {
  this.journals = [];
 };
 JournalsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalsManager.prototype.getAllJournals = function () {
  var self = this;
  var deferred = $q.defer();
  //self.journals = [];
  $http.get('/api/journals/all').success(function (data) {
   //self.journals = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalsManager.prototype.getAppJournals = function (appName) {
  var self = this;
  var deferred = $q.defer();
  // self.journals = [];
  $http.get('/api/journals/all/' + appName).success(function (data) {
   //self.journals = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalsManager.prototype.getMyJournals = function () {
  var self = this;
  var deferred = $q.defer();
  //self.journals = [];
  $http.get('/api/journals/mine').success(function (data) {
   //self.journals = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalsManager.prototype.getJournal = function (journalId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.journal = [];
  $http.get('/api/journal/' + journalId + '//' + Id).success(function (data) {
   self.journal = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalsManager.prototype.createJournal = function (journalData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/create',
   data: journalData
  }).success(function (data) {
   self.journals.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalsManager.prototype.editJournal = function (journalData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journaledit',
   data: journalData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return JournalsManager;
};

journalsManager.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalsManager', journalsManager);
