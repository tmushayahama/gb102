var componentsSrv = function ($http, $q) {

 var ComponentsSrv = function () {
 };
 ComponentsSrv.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 ComponentsSrv.prototype.getExplorerComponents = function (explorerId, componentId, gbFormat) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/components/' + componentId + "/gbformat/" + gbFormat).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 /*
  ComponentsSrv.prototype.getExplorerSubComponents = function (explorerId, componentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/components/' + componentId).success(function (data) {
  self.deferredHandler(data, deferred);
  }).error(function (data) {
  self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
  };
  */

 ComponentsSrv.prototype.getComponents = function (componentId, gbFormat) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/component/' + componentId + '/components/gbformat/' + gbFormat).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ComponentsSrv.prototype.getExplorerComponent = function (explorerId, componentId) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/explorer/' + explorerId + '/component/' + componentId).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ComponentsSrv.prototype.createExplorerComponent = function (explorerComponentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/' + explorerComponentData.explorerId + '/components/create',
   data: explorerComponentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ComponentsSrv.prototype.editExplorerComponent = function (explorerComponentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/explorer/component/edit',
   data: explorerComponentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ComponentsSrv.prototype.editComponentBackground = function (componentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/component/' + componentData.componentId + '/edit/background',
   data: componentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };


 return ComponentsSrv;
};

componentsSrv.$inject = ['$http', '$q'];

angular.module('app.explorer').service('ComponentsSrv', componentsSrv);