var explorerObjectiveSrv = function ($http, $q) {

 var ExplorerObjectiveSrv = function () {
  this.explorerObjectives = [];
 };
 ExplorerObjectiveSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerObjectiveSrv.prototype.getExplorerObjective = function (explorerId, objectiveId) {
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


 ExplorerObjectiveSrv.prototype.editExplorerObjective = function (explorerObjectiveData) {
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

 return ExplorerObjectiveSrv;
};

explorerObjectiveSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerObjectiveSrv', explorerObjectiveSrv);