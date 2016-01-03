var groupWeblinkManager = function ($http, $q) {

 var GroupWeblinkManager = function () {
  this.groupWeblinks = [];
 };
 GroupWeblinkManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 GroupWeblinkManager.prototype.getGroupWeblink = function (groupId, weblinkId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/group/' + groupId + '/weblink/' + weblinkId).success(function (data) {
   self.groupWeblink = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 GroupWeblinkManager.prototype.editGroupWeblink = function (groupWeblinkData) {
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

 return GroupWeblinkManager;
};

groupWeblinkManager.$inject = ['$http', '$q'];

angular.module('app.groups').service('GroupWeblinkManager', groupWeblinkManager);