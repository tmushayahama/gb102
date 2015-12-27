var skillWeblinkManager = function ($http, $q) {

 var SkillWeblinkManager = function () {
  this.skillWeblinks = [];
 };
 SkillWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 SkillWeblinkManager.prototype.getSkillWeblink = function (skillId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/skill/' + skillId + '/weblink/' + weblinkId).success(function (data) {
   self.skillWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 SkillWeblinkManager.prototype.editSkillWeblink = function (skillWeblinkData) {
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

 return SkillWeblinkManager;
};

skillWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.skills').service('SkillWeblinkManager', skillWeblinkManager);