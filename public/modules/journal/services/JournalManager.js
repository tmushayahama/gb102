var journalManager = function ($http, $q) {

 var JournalManager = function () {
  this.journal = [];
 };
 JournalManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalManager.prototype.getJournal = function (journalId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/journal/' + journalId).success(function (data) {
   //self.journal = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalManager.prototype.getSubJournals = function (parentExploreId) {
  var self = this;
  var deferred = $q.defer();
  //self.journals = [];
  $http.get('/api/journals/subjournals/' + parentExploreId).success(function (data) {
   //self.journals = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalManager.prototype.editJournal = function (journalData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/edit',
   data: journalData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return JournalManager;
};

journalManager.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalManager', journalManager);
