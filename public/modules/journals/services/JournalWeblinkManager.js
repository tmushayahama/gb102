var journalWeblinkManager = function ($http, $q) {

 var JournalWeblinkManager = function () {
  this.journalWeblinks = [];
 };
 JournalWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 JournalWeblinkManager.prototype.getJournalWeblink = function (journalId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/journal/' + journalId + '/weblink/' + weblinkId).success(function (data) {
   self.journalWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 JournalWeblinkManager.prototype.editJournalWeblink = function (journalWeblinkData) {
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

 return JournalWeblinkManager;
};

journalWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.journals').service('JournalWeblinkManager', journalWeblinkManager);