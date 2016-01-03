var groupManager = function ($http, $q) {

 var GroupManager = function () {
  this.group = [];
 };
 GroupManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 GroupManager.prototype.getGroup = function (groupId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/group/' + groupId).success(function (data) {
   self.group = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GroupManager.prototype.editGroup = function (groupData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/group/edit',
   data: groupData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return GroupManager;
};

groupManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupManager', groupManager);
