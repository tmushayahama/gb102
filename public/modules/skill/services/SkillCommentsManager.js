var skillCommentsSrv = function ($http, $q) {

 var SkillCommentsSrv = function () {
  this.skillComments = [];
 };
 SkillCommentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SkillCommentsSrv.prototype.getSkillComments = function (skillId) {
  var self = this;
  var deferred = $q.defer();
  self.skillComments = [];
  $http.get('/api/skill/' + skillId + '/comments').success(function (data) {
   self.skillComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillCommentsSrv.prototype.getSkillComment = function (skillId, commentId) {
  var self = this;
  var deferred = $q.defer();
  self.skillComments = [];
  $http.get('/api/skill/' + skillId + '/comment/' + commentId).success(function (data) {
   self.skillComments = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillCommentsSrv.prototype.createSkillComment = function (skillCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/comment/create',
   data: skillCommentData
  }).success(function (data) {
   self.skillComments.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillCommentsSrv.prototype.editSkillComment = function (skillCommentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/comment/edit',
   data: skillCommentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SkillCommentsSrv;
};

skillCommentsSrv.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillCommentsSrv', skillCommentsSrv);
