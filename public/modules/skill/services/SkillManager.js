var skillSrv = function ($http, $q) {

 var SkillSrv = function () {
  this.skill = [];
 };
 SkillSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SkillSrv.prototype.getSkill = function (skillId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/skill/' + skillId).success(function (data) {
   self.skill = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SkillSrv.prototype.editSkill = function (skillData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/edit',
   data: skillData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return SkillSrv;
};

skillSrv.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillSrv', skillSrv);
