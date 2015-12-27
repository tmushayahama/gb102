var skillsManager = function ($http, $q) {

 var SkillsManager = function () {
  this.skills = [];
 };
 SkillsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SkillsManager.prototype.getAllSkills = function () {
  var self = this;
  var deferred = $q.defer();
  self.skills = [];
  $http.get('/api/skills/all').success(function (data) {
   self.skills = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillsManager.prototype.getMySkills = function () {
  var self = this;
  var deferred = $q.defer();
  self.skills = [];
  $http.get('/api/skills/mine').success(function (data) {
   self.skills = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillsManager.prototype.getSkill = function (skillId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.skill = [];
  $http.get('/api/skill/' + skillId + '//' + Id).success(function (data) {
   self.skill = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillsManager.prototype.createSkill = function (skillData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/create',
   data: skillData
  }).success(function (data) {
   self.skills.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillsManager.prototype.editSkill = function (skillData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skilledit',
   data: skillData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return SkillsManager;
};

skillsManager.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillsManager', skillsManager);

