var skillWeblinksManager = function ($http, $q) {

 var SkillWeblinksManager = function () {
  this.skillWeblinks = [];
 };
 SkillWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SkillWeblinksManager.prototype.getSkillWeblinks = function (skillId) {
  var self = this;
  var deferred = $q.defer();
  self.skillWeblinks = [];
  $http.get('/api/skill/' + skillId + '/weblinks').success(function (data) {
   self.skillWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillWeblinksManager.prototype.getSkillWeblink = function (skillId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.skillWeblinks = [];
  $http.get('/api/skill/' + skillId + '/weblink/' + weblinkId).success(function (data) {
   self.skillWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillWeblinksManager.prototype.createSkillWeblink = function (skillWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/weblink/create',
   data: skillWeblinkData
  }).success(function (data) {
   self.skillWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillWeblinksManager.prototype.editSkillWeblink = function (skillWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/weblink/edit',
   data: skillWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SkillWeblinksManager;
};


skillWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillWeblinksManager', skillWeblinksManager);