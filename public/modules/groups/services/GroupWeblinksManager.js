var groupWeblinksManager = function ($http, $q) {

 var GroupWeblinksManager = function () {
  this.groupWeblinks = [];
 };
 GroupWeblinksManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupWeblinksManager.prototype.getGroupWeblinks = function (groupId) {
  var self = this;
  var deferred = $q.defer();
  self.groupWeblinks = [];
  $http.get('/api/group/' + groupId + '/weblinks').success(function (data) {
   self.groupWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupWeblinksManager.prototype.getGroupWeblink = function (groupId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  self.groupWeblinks = [];
  $http.get('/api/group/' + groupId + '/weblink/' + weblinkId).success(function (data) {
   self.groupWeblinks = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupWeblinksManager.prototype.createGroupWeblink = function (groupWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/weblink/create',
   data: groupWeblinkData
  }).success(function (data) {
   self.groupWeblinks.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupWeblinksManager.prototype.editGroupWeblink = function (groupWeblinkData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/weblink/edit',
   data: groupWeblinkData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return GroupWeblinksManager;
};


groupWeblinksManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupWeblinksManager', groupWeblinksManager);