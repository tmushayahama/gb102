var journalWeblinksManager = function ($http, $q) {

 var JournalWeblinksManager = function () {
  this.journalWeblinks = [];
 };
 JournalWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalWeblinksManager.prototype.getJournalWeblinks = function (journalId) {
  var self = this;
  var deferred = $q.defer();
  self.journalWeblinks = [];
  $http.get('/api/journal/' + journalId + '/weblinks').success(function (data) {
   self.journalWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalWeblinksManager.prototype.getJournalWeblink = function (journalId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.journalWeblinks = [];
  $http.get('/api/journal/' + journalId + '/weblink/' + weblinkId).success(function (data) {
   self.journalWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalWeblinksManager.prototype.createJournalWeblink = function (journalWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/weblink/create',
   data: journalWeblinkData
  }).success(function (data) {
   self.journalWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalWeblinksManager.prototype.editJournalWeblink = function (journalWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/weblink/edit',
   data: journalWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return JournalWeblinksManager;
};


journalWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalWeblinksManager', journalWeblinksManager);