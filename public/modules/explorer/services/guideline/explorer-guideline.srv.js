var explorerGuidelineSrv = function ($http, $q) {

 var ExplorerGuidelineSrv = function () {
  this.explorerGuidelines = [];
 };
 ExplorerGuidelineSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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


 ExplorerGuidelineSrv.prototype.getExplorerGuideline = function (explorerId, guidelineId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/guideline/' + guidelineId).success(function (data) {
   self.explorerGuideline = data;
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 ExplorerGuidelineSrv.prototype.editExplorerGuideline = function (explorerGuidelineData) {
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

 return ExplorerGuidelineSrv;
};

explorerGuidelineSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ExplorerGuidelineSrv', explorerGuidelineSrv);