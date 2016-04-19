var explorerExercisesSrv = function ($http, $q) {

 var ExplorerExercisesSrv = function () {
  this.explorerExercises = [];
 };
 ExplorerExercisesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerExercisesSrv.prototype.getExplorerExercises = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerExercises = [];
  $http.get('/api/explorer/' + explorerId + '/exercises').success(function (data) {
   self.explorerExercises = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerExercisesSrv.prototype.getExplorerExercise = function (explorerId, exerciseId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerExercises = [];
  $http.get('/api/explorer/' + explorerId + '/exercise/' + exerciseId).success(function (data) {
   self.explorerExercises = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerExercisesSrv.prototype.createExplorerExercise = function (explorerExerciseData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/exercise/create',
   data: explorerExerciseData
  }).success(function (data) {
   self.explorerExercises.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerExercisesSrv.prototype.editExplorerExercise = function (explorerExerciseData) {
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


 return ExplorerExercisesSrv;
};

explorerExercisesSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerExercisesSrv', explorerExercisesSrv);