var skillSwipesManager = function ($http, $q) {

 var SkillSwipesManager = function () {
  this.skillSwipes = [];
 };
 SkillSwipesManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SkillSwipesManager.prototype.getSkillSwipess = function () {
  var self = this;
  var deferred = $q.defer();
  self.skillSwipess = [];
  $http.get('/api/skills/swipes').success(function (data) {
   self.skillSwipess = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SkillSwipesManager.prototype.getSkillSwipe = function () {
  var self = this;
  var deferred = $q.defer();
  self.skill = [];
  $http.get('/api/skills/swipe').success(function (data) {
   self.skill = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillSwipesManager.prototype.createSkill = function (skillData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/create',
   data: skillData
  }).success(function (data) {
   self.skillSwipes.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillSwipesManager.prototype.editSkill = function (skillData) {
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
 return SkillSwipesManager;
};

skillSwipesManager.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillSwipesManager', skillSwipesManager);

