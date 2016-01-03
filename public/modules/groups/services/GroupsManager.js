var groupsManager = function ($http, $q) {

 var GroupsManager = function () {
  this.groups = [];
 };
 GroupsManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupsManager.prototype.getAllGroups = function () {
  var self = this;
  var deferred = $q.defer();
  self.groups = [];
  $http.get('/api/groups/all').success(function (data) {
   self.groups = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupsManager.prototype.getMyGroups = function () {
  var self = this;
  var deferred = $q.defer();
  self.groups = [];
  $http.get('/api/groups/mine').success(function (data) {
   self.groups = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupsManager.prototype.getGroup = function (groupId, Id) {
  var self = this;
  var deferred = $q.defer();
  self.group = [];
  $http.get('/api/group/' + groupId + '//' + Id).success(function (data) {
   self.group = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupsManager.prototype.createGroup = function (groupData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/create',
   data: groupData
  }).success(function (data) {
   self.groups.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 GroupsManager.prototype.editGroup = function (groupData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/groupedit',
   data: groupData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };
 return GroupsManager;
};

groupsManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupsManager', groupsManager);

