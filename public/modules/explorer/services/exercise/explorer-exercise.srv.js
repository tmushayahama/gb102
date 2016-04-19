var explorerExerciseSrv = function ($http, $q) {

 var ExplorerExerciseSrv = function () {
  this.explorerExercises = [];
 };
 ExplorerExerciseSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerExerciseSrv.prototype.getExplorerExercise = function (explorerId, exerciseId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/exercise/' + exerciseId).success(function (data) {
   self.explorerExercise = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerExerciseSrv.prototype.editExplorerExercise = function (explorerExerciseData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/exercise/edit',
   data: explorerExerciseData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 return ExplorerExerciseSrv;
};

explorerExerciseSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerExerciseSrv', explorerExerciseSrv);