var explorerPlanSrv = function ($http, $q) {

 var ExplorerPlanSrv = function () {
  this.explorerPlans = [];
 };
 ExplorerPlanSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerPlanSrv.prototype.getExplorerPlan = function (explorerId, planId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/plan/' + planId).success(function (data) {
   self.explorerPlan = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerPlanSrv.prototype.editExplorerPlan = function (explorerPlanData) {
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

 return ExplorerPlanSrv;
};

explorerPlanSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerPlanSrv', explorerPlanSrv);