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

 ComponentsSrv.prototype.getComponents = function (listFormat) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/components/listformat/' + listFormat).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ComponentsSrv.prototype.getComponentsByType = function (type, listFormat) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/components/listformat/' + listFormat + '/type/' + type).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ComponentsSrv.prototype.getComponent = function (componentId, listFormat) {
  var self = this;
  var deferred = $q.defer();
  $http.get('/api/components/' + componentId + '/listformat/' + listFormat).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 /*
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
  */


 ComponentsSrv.prototype.createComponent = function (componentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/component/create',
   data: componentData
  }).success(function (data) {
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 ComponentsSrv.prototype.editComponentDescription = function (componentData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/component/' + componentData.componentId + '/edit/description',
   data: componentData
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