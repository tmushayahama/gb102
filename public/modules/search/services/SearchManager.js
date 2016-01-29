var searchManager = function ($http, $q) {

 var SearchManager = function () {
  this.search = [];
 };
 SearchManager.prototype.deferredHandler = function (data, deferred, defaultMsg) {
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

 SearchManager.prototype.simpleSearch = function (searchData) {
  var self = this;
  var deferred = $q.defer();
  $http({
   method: 'POST',
   url: '/api/search/simple',
   data: searchData
  }).success(function (data) {
   self.search.unshift(data);
   self.deferredHandler(data, deferred);
  }).error(function (data) {
   self.deferredHandler(data, deferred, 'Unknown error');
  });
  return deferred.promise;
 };

 SearchManager.prototype.simpleSearchSuggestion = function (searchData) {
  var self = this;
  return $http({
   method: 'POST',
   url: '/api/search/suggestion',
   data: searchData
  });
 };

 return SearchManager;
};

searchManager.$inject = ['$http', '$q'];

angular.module('app').service('SearchManager', searchManager);

