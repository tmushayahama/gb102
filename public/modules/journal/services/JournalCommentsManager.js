var journalCommentsSrv = function ($http, $q) {

 var JournalCommentsSrv = function () {
  this.journalComments = [];
 };
 JournalCommentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 JournalCommentsSrv.prototype.getJournalComments = function (journalId) {
  var self = this;
  var deferred = $q.defer();
  self.journalComments = [];
  $http.get('/api/journal/' + journalId + '/comments').success(function (data) {
   self.journalComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalCommentsSrv.prototype.getJournalComment = function (journalId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.journalComments = [];
  $http.get('/api/journal/' + journalId + '/comment/' + commentId).success(function (data) {
   self.journalComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalCommentsSrv.prototype.createJournalComment = function (journalCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/comment/create',
   data: journalCommentData
  }).success(function (data) {
   self.journalComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 JournalCommentsSrv.prototype.editJournalComment = function (journalCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/journal/comment/edit',
   data: journalCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return JournalCommentsSrv;
};

journalCommentsSrv.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalCommentsSrv', journalCommentsSrv);
