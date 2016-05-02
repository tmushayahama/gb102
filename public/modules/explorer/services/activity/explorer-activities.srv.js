var explorerActivitiesSrv = function ($http, $q) {

 var ExplorerActivitiesSrv = function () {
 };
 ExplorerActivitiesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerActivitiesSrv.prototype.getExplorerActivities = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/activities').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitiesSrv.prototype.getSubActivities = function (activityId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/activity/' + activityId + '/activities').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitiesSrv.prototype.getExplorerActivity = function (explorerId, activityId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/activity/' + activityId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitiesSrv.prototype.createExplorerActivity = function (explorerActivityData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/activity/create',
   data: explorerActivityData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitiesSrv.prototype.editExplorerActivity = function (explorerActivityData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/activity/edit',
   data: explorerActivityData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitiesSrv.prototype.editExplorerActivity = function (explorerActivityData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/activity/edit',
   data: explorerActivityData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerActivitiesSrv.prototype.getActivityQuestions = function (activityId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/activity/' + activityId + '/questions').success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerActivitiesSrv;
};

explorerActivitiesSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerActivitiesSrv', explorerActivitiesSrv);