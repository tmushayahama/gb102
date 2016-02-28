var journalCommentSrv = function ($http, $q) {

 var JournalCommentSrv = function () {
  this.journalComments = [];
 };
 JournalCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 JournalCommentSrv.prototype.getJournalComment = function (journalId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/journal/' + journalId + '/comment/' + commentId).success(function (data) {
   self.journalComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 JournalCommentSrv.prototype.editJournalComment = function (journalCommentData) {
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

 return JournalCommentSrv;
};

journalCommentSrv.$inject = ['$http', '$q'];

angular.module('app.journal').service('JournalCommentSrv', journalCommentSrv);
