var explorerObjectivesSrv = function ($http, $q) {

 var ExplorerObjectivesSrv = function () {
  this.explorerObjectives = [];
 };
 ExplorerObjectivesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerObjectivesSrv.prototype.getExplorerObjectives = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerObjectives = [];
  $http.get('/api/explorer/' + explorerId + '/objectives').success(function (data) {
   self.explorerObjectives = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerObjectivesSrv.prototype.createExplorerObjective = function (explorerObjectiveData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/objective/create',
   data: explorerObjectiveData
  }).success(function (data) {
   self.explorerObjectives.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerObjectivesSrv.prototype.editExplorerObjective = function (explorerObjectiveData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/objective/edit',
   data: explorerObjectiveData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 //Objective

 ExplorerObjectivesSrv.prototype.getExplorerObjective = function (explorerId, objectiveId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/objective/' + objectiveId).success(function (data) {
   self.explorerObjective = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerObjectivesSrv.prototype.editExplorerObjective = function (explorerObjectiveData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/objective/edit',
   data: explorerObjectiveData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerObjectivesSrv;
};

explorerObjectivesSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerObjectivesSrv', explorerObjectivesSrv);