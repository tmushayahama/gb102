var explorerPlansSrv = function ($http, $q) {

 var ExplorerPlansSrv = function () {
  this.explorerPlans = [];
 };
 ExplorerPlansSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerPlansSrv.prototype.getExplorerPlans = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerPlans = [];
  $http.get('/api/explorer/' + explorerId + '/plans').success(function (data) {
   self.explorerPlans = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerPlansSrv.prototype.getExplorerPlan = function (explorerId, planId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerPlans = [];
  $http.get('/api/explorer/' + explorerId + '/plan/' + planId).success(function (data) {
   self.explorerPlans = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerPlansSrv.prototype.createExplorerPlan = function (explorerPlanData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/plan/create',
   data: explorerPlanData
  }).success(function (data) {
   self.explorerPlans.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerPlansSrv.prototype.editExplorerPlan = function (explorerPlanData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/plan/edit',
   data: explorerPlanData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerPlansSrv;
};

explorerPlansSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerPlansSrv', explorerPlansSrv);