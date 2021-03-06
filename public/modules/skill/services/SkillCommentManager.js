var skillCommentSrv = function ($http, $q) {

 var SkillCommentSrv = function () {
  this.skillComments = [];
 };
 SkillCommentSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SkillCommentSrv.prototype.getSkillComment = function (skillId, commentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/skill/' + skillId + '/comment/' + commentId).success(function (data) {
   self.skillComment = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SkillCommentSrv.prototype.editSkillComment = function (skillCommentData) {
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

 return SkillCommentSrv;
};

skillCommentSrv.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillCommentSrv', skillCommentSrv);
