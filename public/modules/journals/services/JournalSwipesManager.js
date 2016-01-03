var journalSwipesManager = function ($http, $q) {

 var JournalSwipesManager = function () {
  this.journalSwipes = [];
 };
 JournalSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalSwipesManager.prototype.getJournalSwipes = function () {
  var self = this;
  var deferred = $q.defer();
  self.journalSwipes = [];
  $http.get('/api/journals/swipes').success(function (data) {
   self.journalSwipes = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 JournalSwipesManager.prototype.getJournalSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.journal = [];
  $http.get('/api/journals/swipe').success(function (data) {
   self.journal = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalSwipesManager.prototype.createJournalSwipe = function (journalSwipeData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journals/swipe/create',
   data: journalSwipeData
  }).success(function (data) {
   self.journalSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalSwipesManager.prototype.editJournal = function (journalData) {
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
 return JournalSwipesManager;
};

journalSwipesManager.$inject = ['$http', '$q'];

angular.module('app.journals').service('JournalSwipesManager', journalSwipesManager);

