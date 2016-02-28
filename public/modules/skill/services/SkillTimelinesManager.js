var skillProgressSrv = function ($http, $q) {

 var SkillProgressSrv = function () {
  this.skillProgress = [];
 };
 SkillProgressSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SkillProgressSrv.prototype.getSkillProgress = function (skillId) {
  var self = this;
  var deferred = $q.defer();
  self.skillProgress = [];
  $http.get('/api/skill/' + skillId + '/progress').success(function (data) {
   self.skillProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillProgressSrv.prototype.getSkillProgress = function (skillId, progressId) {
  var self = this;
  var deferred = $q.defer();
  self.skillProgress = [];
  $http.get('/api/skill/' + skillId + '/progress/' + progressId).success(function (data) {
   self.skillProgress = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillProgressSrv.prototype.createSkillProgress = function (skillProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/progress/create',
   data: skillProgressData
  }).success(function (data) {
   self.skillProgress.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SkillProgressSrv.prototype.editSkillProgress = function (skillProgressData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/skill/progress/edit',
   data: skillProgressData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return SkillProgressSrv;
};

skillProgressSrv.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillProgressSrv', skillProgressSrv);
