var explorerGuidelinesSrv = function ($http, $q) {

 var ExplorerGuidelinesSrv = function () {
  this.explorerGuidelines = [];
 };
 ExplorerGuidelinesSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ExplorerGuidelinesSrv.prototype.getExplorerGuidelines = function (explorerId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerGuidelines = [];
  $http.get('/api/explorer/' + explorerId + '/guidelines').success(function (data) {
   self.explorerGuidelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerGuidelinesSrv.prototype.getExplorerGuideline = function (explorerId, guidelineId) {
  var self = this;
  var deferred = $q.defer();
  self.explorerGuidelines = [];
  $http.get('/api/explorer/' + explorerId + '/guideline/' + guidelineId).success(function (data) {
   self.explorerGuidelines = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerGuidelinesSrv.prototype.createExplorerGuideline = function (explorerGuidelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/guideline/create',
   data: explorerGuidelineData
  }).success(function (data) {
   self.explorerGuidelines.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ExplorerGuidelinesSrv.prototype.editExplorerGuideline = function (explorerGuidelineData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/guideline/edit',
   data: explorerGuidelineData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ExplorerGuidelinesSrv;
};

explorerGuidelinesSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerGuidelinesSrv', explorerGuidelinesSrv);